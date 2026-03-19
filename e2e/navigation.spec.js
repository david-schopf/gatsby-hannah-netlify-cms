import {expect, test} from '@playwright/test'

test.describe('Navbar', () => {
  test.beforeEach(async ({page}) => {
    await page.goto('/')
  })

  test('logo links to homepage', async ({page}) => {
    await page.getByRole('navigation').getByRole('link', {name: 'Hannah Schopf'}).click()
    await expect(page).toHaveURL('/')
  })

  test('About link navigates to about page', async ({page}) => {
    await page.getByRole('navigation').getByRole('link', {name: 'About'}).click()
    await expect(page).toHaveURL('/about')
    await expect(page.getByRole('main')).toBeVisible()
  })

  test('Kontakt link navigates to contact page', async ({page}) => {
    await page.getByRole('navigation').getByRole('link', {name: 'Kontakt'}).click()
    await expect(page).toHaveURL('/contact')
  })

  test('Theater tag link navigates correctly', async ({page}) => {
    await page.getByRole('navigation').getByRole('link', {name: 'Theater'}).click()
    await expect(page).toHaveURL('/tags/theater/')
  })

  test('Film tag link navigates correctly', async ({page}) => {
    await page.getByRole('navigation').getByRole('link', {name: 'Film'}).click()
    await expect(page).toHaveURL('/tags/film/')
  })

  test('Papier tag link navigates correctly', async ({page}) => {
    await page.getByRole('navigation').getByRole('link', {name: 'Papier'}).click()
    await expect(page).toHaveURL('/tags/papier/')
  })

  test('Autorin tag link navigates correctly', async ({page}) => {
    await page.getByRole('navigation').getByRole('link', {name: 'Autorin'}).click()
    await expect(page).toHaveURL('/tags/autorin/')
  })

  test('Dramaturgin tag link navigates correctly', async ({page}) => {
    await page.getByRole('navigation').getByRole('link', {name: 'Dramaturgin'}).click()
    await expect(page).toHaveURL('/tags/dramaturgin/')
  })

  test('Regisseurin tag link navigates correctly', async ({page}) => {
    await page.getByRole('navigation').getByRole('link', {name: 'Regisseurin'}).click()
    await expect(page).toHaveURL('/tags/regisseurin/')
  })

  test('hamburger button toggles mobile menu', async ({page}) => {
    await page.setViewportSize({width: 768, height: 1024})
    const burger = page.getByRole('button', {name: /Navigation öffnen/i})
    const navMenu = page.locator('#navMenu')

    await expect(navMenu).not.toHaveClass(/is-active/)
    await burger.click()
    await expect(navMenu).toHaveClass(/is-active/)
    await burger.click()
    await expect(navMenu).not.toHaveClass(/is-active/)
  })
})

test.describe('Footer', () => {
  test('Impressum link navigates to impressum page', async ({page}) => {
    await page.goto('/')
    await page.getByRole('contentinfo').getByRole('link', {name: /Impressum/}).click()
    await expect(page).toHaveURL('/impressum')
  })

  test('footer shows copyright with current year', async ({page}) => {
    await page.goto('/')
    const year = new Date().getFullYear().toString()
    await expect(page.getByRole('contentinfo')).toContainText(year)
  })
})
