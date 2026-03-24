import {expect, test} from '@playwright/test'

const routes = [
  {path: '/', title: 'Hannah Schopf'},
  {path: '/about', title: 'Hannah Schopf'},
  {path: '/contact', title: 'Hannah Schopf'},
  {path: '/impressum', title: 'Hannah Schopf'},
  {path: '/tags/theater/', title: 'Hannah Schopf'},
  {path: '/tags/film/', title: 'Hannah Schopf'},
  {path: '/tags/papier/', title: 'Hannah Schopf'},
  {path: '/tags/autorin/', title: 'Hannah Schopf'},
  {path: '/tags/dramaturgin/', title: 'Hannah Schopf'},
  {path: '/tags/regisseurin/', title: 'Hannah Schopf'},
]

for (const {path, title} of routes) {
  test(`${path} loads without errors`, async ({page}) => {
    const consoleErrors = []
    page.on('console', msg => {
      if (msg.type() === 'error') consoleErrors.push(msg.text())
    })
    page.on('pageerror', err => consoleErrors.push(err.message))

    const response = await page.goto(path)
    expect(response.status()).toBe(200)
    await expect(page).toHaveTitle(new RegExp(title))
    expect(consoleErrors).toEqual([])
  })
}

test('404 page renders for unknown route', async ({page}) => {
  // Gatsby dev server serves custom 404 at /404/
  await page.goto('/404/')
  await expect(page.getByRole('heading', {name: 'NOT FOUND'})).toBeVisible()
})
