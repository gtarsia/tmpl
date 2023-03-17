import { tmplBuild } from './index'

test('tmplBuild', () => {
  const built = tmplBuild('qwe #{asd} zxc')
  expect(built.render({ asd: 123 })).toBe('qwe 123 zxc')
})
