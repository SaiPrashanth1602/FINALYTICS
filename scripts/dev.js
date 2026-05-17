import { spawn } from "node:child_process"

const commands = [
  { name: "api", command: "node", args: ["server.js"] },
  { name: "vite", command: "npm.cmd", args: ["run", "dev", "--", "--host", "127.0.0.1"] },
]

const children = commands.map(({ name, command, args }) => {
  const child = spawn(command, args, {
    shell: false,
    stdio: ["ignore", "pipe", "pipe"],
  })

  child.stdout.on("data", (chunk) => {
    process.stdout.write(`[${name}] ${chunk}`)
  })

  child.stderr.on("data", (chunk) => {
    process.stderr.write(`[${name}] ${chunk}`)
  })

  child.on("exit", (code) => {
    if (code && code !== 0) {
      console.error(`[${name}] exited with code ${code}`)
      shutdown()
    }
  })

  return child
})

function shutdown() {
  children.forEach((child) => {
    if (!child.killed) {
      child.kill()
    }
  })
}

process.on("SIGINT", () => {
  shutdown()
  process.exit(0)
})

process.on("SIGTERM", () => {
  shutdown()
  process.exit(0)
})
