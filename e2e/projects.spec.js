import {expect, test} from '@playwright/test'

test.describe('Project pages', () => {
  test('homepage project grid items link to valid project pages', async ({page}) => {
    await page.goto('/')

    // Collect all project links from the grid
    const projectLinks = page.locator('.columns .column a')
    const count = await projectLinks.count()
    expect(count).toBeGreaterThan(0)

    // Verify the first project link leads to a working page
    const firstHref = await projectLinks.first().getAttribute('href')
    expect(firstHref).toBeTruthy()
    expect(firstHref).toMatch(/^\/projects\//)

    const response = await page.goto(firstHref)
    expect(response.status()).toBe(200)
  })

  test('project page renders navbar and footer', async ({page}) => {
    await page.goto('/')
    const firstLink = page.locator('.columns .column a').first()
    const href = await firstLink.getAttribute('href')
    await page.goto(href)

    await expect(page.getByRole('navigation')).toBeVisible()
    await expect(page.getByRole('contentinfo')).toBeVisible()
  })

  test('project page renders a heading', async ({page}) => {
    await page.goto('/')
    const firstLink = page.locator('.columns .column a').first()
    const href = await firstLink.getAttribute('href')
    await page.goto(href)

    const heading = page.getByRole('heading').first()
    await expect(heading).toBeVisible()
  })

  test('project page has main content area', async ({page}) => {
    await page.goto('/')
    const firstLink = page.locator('.columns .column a').first()
    const href = await firstLink.getAttribute('href')
    await page.goto(href)

    await expect(page.getByRole('main')).toBeVisible()
  })

  test('tag pages link back to project pages', async ({page}) => {
    await page.goto('/tags/film/')
    const links = page.getByRole('main').getByRole('link')
    const firstHref = await links.first().getAttribute('href')
    expect(firstHref).toBeTruthy()

    const response = await page.goto(firstHref)
    expect(response.status()).toBe(200)
    await expect(page.getByRole('main')).toBeVisible()
  })
})
