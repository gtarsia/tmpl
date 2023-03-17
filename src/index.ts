import { walkStart, walkIsDone, readUntil, skip } from '@zyxw/walker'

type TemplateRender = (get: (key: string) => string) => string
type TemplateFileParts = Array<string | TemplateRender>

export function tmplBuild(text: string): Renderable {
  const parts = [] as Array<string | TemplateRender>
  const vars = [] as string[]
  const walk = walkStart(text)
  while (!walkIsDone(walk)) {
    const part = readUntil(walk, '#{')
    if (part) {
      parts.push(part)
    }
    skip(walk, 2)
    const varName = readUntil(walk, '}')
    if (varName) {
      parts.push((get) => get(varName))
      vars.push(varName)
    }
    skip(walk, 1)
  }
  const render = (obj: any) => {
    const get = (key: string) => obj[key]
    let result = ''
    for (const part of parts) {
      if (typeof part === 'string') {
        result += part
      } else {
        result += part(get)
      }
    }
    return result
  }
  return { render }
}

export type Renderable = { render: (obj: any) => string }
