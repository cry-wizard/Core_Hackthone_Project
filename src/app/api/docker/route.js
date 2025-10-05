import Docker from "dockerode";
import os from "os";

const docker =
  os.platform() === "win32"
    ? new Docker({ socketPath: "//./pipe/docker_engine" }) // Windows
    : new Docker({
        socketPath: process.env.DOCKER_SOCKET || "/var/run/docker.sock",
      });


export async function POST(req) {
  try {
    const body = await req.json();
    const { type, name, hostPort } = body;

    if (!["ssh", "sql", "http"].includes(type)) {
      return new Response(JSON.stringify({ error: "type must be ssh|sql|http" }), { status: 400 });
    }

    const config = {
      ssh: { image: "ssh-honeypot", port: 2222 },
      sql: { image: "sql-honeypot", port: 13306 },
      http: { image: "http-honeypot", port: 8080 }
    }[type];

    const containerName = name || `honeypot-${type}-${Date.now()}`;

    const created = await docker.createContainer({
      Image: config.image,
      name: containerName,
      ExposedPorts: { [`${config.port}/tcp`]: {} },
      HostConfig: {
        PortBindings: { [`${config.port}/tcp`]: [{}] },
        NetworkMode: "haas-net"
      },
      Labels: { honeypot: "true", honeypot_type: type },
      Env: [`COLLECTOR_URL=http://collector-api:5000`]
    });

    await created.start();

    const info = await created.inspect();

    // Safely read the assigned port
    const assignedPort = info.NetworkSettings.Ports[`${config.port}/tcp`]?.[0]?.HostPort || "N/A";

    return new Response(JSON.stringify({
      id: info.Id,
      name: info.Name.replace(/^\//, ""),
      image: info.Config.Image,
      hostPort: assignedPort,
      internalPort: config.port
    }), { status: 201 });

  } catch (err) {
    console.error("POST API error:", err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}


export async function GET(req) {
  try {
    const containers = await docker.listContainers({
      all: true,
      filters: { label: ["honeypot=true"] },
    });
    const mapped = containers.map((c) => ({
      id: c.Id,
      names: c.Names.map((n) => n.replace(/^\//, "")),
      image: c.Image,
      state: c.State,
      status: c.Status,
      ports: c.Ports || [],
      labels: c.Labels || {},
    }));
    return new Response(JSON.stringify({ containers: mapped }), {
      status: 200,
    });
  } catch (err) {
    console.error("GET API error:", err);
    return new Response(JSON.stringify({ containers: [] }), { status: 200 }); // never empty
  }
}

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id)
      return new Response(JSON.stringify({ error: "id is required" }), {
        status: 400,
      });

    const container = docker.getContainer(id);

    try {
      await container.stop({ t: 2 });
    } catch (e) {
      console.warn("Already stopped");
    }

    await container.remove({ force: true });

    return new Response(JSON.stringify({ removed: id }), { status: 200 });
  } catch (err) {
    console.error("DELETE API error:", err);
    return new Response(
      JSON.stringify({ error: err.message || "unknown error" }),
      { status: 500 }
    );
  }
}
