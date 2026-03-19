import {expect, test} from '@playwright/test'

test.describe('Homepage', () => {
  test.beforeEach(async ({page}) => {
    await page.goto('/')
  })

  test('renders navbar with site name', async ({page}) => {
    await expect(page.getByRole('navigation').getByText('Hannah Schopf')).toBeVisible()
  })

  test('renders project grid with at least one project', async ({page}) => {
    const projectItems = page.locator('.columns .column a')
    await expect(projectItems.first()).toBeVisible()
    const count = await projectItems.count()
    expect(count).toBeGreaterThan(0)
  })

  test('renders footer', async ({page}) => {
    await expect(page.getByRole('contentinfo')).toBeVisible()
    await expect(page.getByRole('contentinfo')).toContainText('Hannah Schopf')
  })
})

test.describe('About page', () => {
  test.beforeEach(async ({page}) => {
    await page.goto('/about')
  })

  test('renders Hannah Schopf bio heading', async ({page}) => {
    await expect(page.getByRole('heading', {name: 'Hannah Schopf'})).toBeVisible()
  })

  test('renders bio body content', async ({page}) => {
    // Verify content area is populated (not empty) without asserting specific CMS text
    const main = page.getByRole('main')
    await expect(main).toBeVisible()
    const text = await main.innerText()
    expect(text.trim().length).toBeGreaterThan(50)
  })

  test('has navbar and footer', async ({page}) => {
    await expect(page.getByRole('navigation')).toBeVisible()
    await expect(page.getByRole('contentinfo')).toBeVisible()
  })
})

test.describe('Contact page', () => {
  test.beforeEach(async ({page}) => {
    await page.goto('/contact')
  })

  test('has navbar and footer', async ({page}) => {
    await expect(page.getByRole('navigation')).toBeVisible()
    await expect(page.getByRole('contentinfo')).toBeVisible()
  })

  test('renders page content', async ({page}) => {
    await expect(page.getByRole('main')).toBeVisible()
  })
})

test.describe('Impressum page', () => {
  test.beforeEach(async ({page}) => {
    await page.goto('/impressum')
  })

  test('renders impressum content', async ({page}) => {
    await expect(page.getByRole('main')).toBeVisible()
  })

  test('has navbar and footer', async ({page}) => {
    await expect(page.getByRole('navigation')).toBeVisible()
    await expect(page.getByRole('contentinfo')).toBeVisible()
  })
})

test.describe('Tag pages', () => {
  const tags = ['theater', 'film', 'papier', 'autorin', 'dramaturgin', 'regisseurin']

  for (const tag of tags) {
    test(`/tags/${tag}/ renders project list`, async ({page}) => {
      await page.goto(`/tags/${tag}/`)
      await expect(page.getByRole('navigation')).toBeVisible()
      await expect(page.getByRole('main')).toBeVisible()
      // Each tag page should list at least one project
      const links = page.getByRole('main').getByRole('link')
      const count = await links.count()
      expect(count).toBeGreaterThan(0)
    })
  }
})
