import { test, expect, type Page } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
  });

test.describe('Neuer Test', () => {
    test('Swag Labs Test', async ({ page }) => {
    /////* LOGIN */////
        // Username -> input
        const username = page.getByPlaceholder('Username')
        // Password -> input
        const password = page.getByPlaceholder('Password')
        // Felder (user, password) leer?
        await expect(username).toBeEmpty()
        await expect(password).toBeEmpty()
        // Login -> input submit
        const login = page.locator('#login-button')
        // ist das Feld Login sichtbar?
        await expect(login).toBeVisible()
     
        //* Pflichtfelder prüfen *//

        // Login-Button Click
        await login.click()
        // Felermeldung: Epic sadface: Username is required
        let errorMessage = page.locator('.error-message-container > h3')
        await expect(errorMessage).toContainText('Epic sadface: Username is required')
        // Cler-Button Click
        const errorButton = page.locator('.error-button')
        await errorButton.click()

        const users = []
        users['username1'] = 'standard_user'
        users['password1'] = 'secret_sauce'

        // Username einfügen
        username.fill(users['username1'])
        // Login-Button Click
        await login.click()
        // Epic sadface: Password is required
        await expect(errorMessage).toContainText('Epic sadface: Password is required')
        // Cler-Button click
        await errorButton.click()
        // Password einfügen
        await password.fill(users['password1'])
        // Login-Button Click
        await login.click()
    /////* LOGIN ENDE*/////

    ////* PRODUKTE */////
        const productCount = page.locator('.inventory_item')
        await expect(productCount).toHaveCount(6)

        // Produkt Nr. 1 -> Img Click
        const item_img = page.locator('.inventory_item_img')
        await item_img.nth(0).click()
        // Add to Cart Button Click
        await page.locator('#add-to-cart-sauce-labs-backpack').click()
        // Add To Cart Text prüfen
        await expect(page.locator('#remove-sauce-labs-backpack')).toContainText('Remove')
        // zurück zu Produkten
        await page.locator('#back-to-products').click()
    ////* PRODUKTE ENDE*/////

    ////* WARENKORB */////
        // Warenkorb -> Anzehl der Produkten prüfen
        await expect(page.locator('.shopping_cart_badge')).toContainText('1')
        // Warenkorb öffnen -> Click
        await page.locator('#shopping_cart_container').click()
        // Text -> Button prüfen
        await expect(page.locator('#remove-sauce-labs-backpack')).toContainText('Remove')
        // Checkout -> Button Click
        await page.locator('#checkout').click()
        // Anmeldung
        const firstName = page.getByPlaceholder('First Name')
        const lastName = page.getByPlaceholder('Last Name')
        const zip = page.getByPlaceholder('Zip/Postal Code')

        // Felder (firstName, lastName, zip) leer?
        await expect(firstName).toBeEmpty()
        await expect(lastName).toBeEmpty()
        await expect(zip).toBeEmpty()

        // Butten continue Click
        const continueBtn = page.locator('#continue')
        await continueBtn.click()

        // Error: First Name is required
        await expect(errorMessage).toContainText('Error: First Name is required')
        // First Name -> input
        await firstName.fill('First Name')
        await continueBtn.click()
        // Error: Last Name is required
        await expect(errorMessage).toContainText('Error: Last Name is required')
        // Last Name -> input
        await lastName.fill('Last Name')
        await continueBtn.click()
        // Error: Postal Code is required
        await expect(errorMessage).toContainText('Error: Postal Code is required')
        // ZIP  -> input
        zip.fill('12345')
        await continueBtn.click()
        // finish -> Button -> Click
        await page.locator('#finish').click()
        // Back Home -> Buttom -> Click
        await page.locator('#back-to-products').click()
    /////* WARENKORB ENDE*/////

    /////* Logout */////
        await page.locator('#react-burger-menu-btn').click()
        await page.locator('#logout_sidebar_link').click()
    /////* Logout ENDE*/////

    })
});