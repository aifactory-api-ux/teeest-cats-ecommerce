# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: buttons.spec.ts >> Botones de CartPage >> botón Proceed to Checkout existe y es clickeable
- Location: tests-functional/buttons.spec.ts:48:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('link', { name: /proceed to checkout/i }).getByRole('button')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByRole('link', { name: /proceed to checkout/i }).getByRole('button')

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - navigation [ref=e4]:
    - generic [ref=e5]:
      - link "teeest cats" [ref=e6] [cursor=pointer]:
        - /url: /
      - generic [ref=e7]:
        - link "Electronics" [ref=e8] [cursor=pointer]:
          - /url: /category/electronics
        - link "Clothing" [ref=e9] [cursor=pointer]:
          - /url: /category/clothing
        - link "Home & Garden" [ref=e10] [cursor=pointer]:
          - /url: /category/home
        - link "Sports" [ref=e11] [cursor=pointer]:
          - /url: /category/sports
      - generic [ref=e12]:
        - link "Sign In" [ref=e13] [cursor=pointer]:
          - /url: /account
        - link [ref=e14] [cursor=pointer]:
          - /url: /cart
          - img [ref=e15]
  - main [ref=e18]:
    - generic [ref=e21]:
      - heading "Your cart is empty" [level=1] [ref=e22]
      - paragraph [ref=e23]: Add some products to your cart to see them here.
      - link "Continue Shopping" [ref=e24] [cursor=pointer]:
        - /url: /
        - button "Continue Shopping" [ref=e25]
  - contentinfo [ref=e26]:
    - generic [ref=e27]:
      - generic [ref=e28]:
        - heading "teeest cats" [level=3] [ref=e29]
        - paragraph [ref=e30]: Your favorite online store for quality products at great prices.
      - generic [ref=e31]:
        - heading "Shop" [level=4] [ref=e32]
        - list [ref=e33]:
          - listitem [ref=e34]:
            - link "Electronics" [ref=e35] [cursor=pointer]:
              - /url: /category/electronics
          - listitem [ref=e36]:
            - link "Clothing" [ref=e37] [cursor=pointer]:
              - /url: /category/clothing
          - listitem [ref=e38]:
            - link "Home & Garden" [ref=e39] [cursor=pointer]:
              - /url: /category/home
          - listitem [ref=e40]:
            - link "Sports" [ref=e41] [cursor=pointer]:
              - /url: /category/sports
      - generic [ref=e42]:
        - heading "Account" [level=4] [ref=e43]
        - list [ref=e44]:
          - listitem [ref=e45]:
            - link "My Account" [ref=e46] [cursor=pointer]:
              - /url: /account
          - listitem [ref=e47]:
            - link "Cart" [ref=e48] [cursor=pointer]:
              - /url: /cart
          - listitem [ref=e49]:
            - link "Checkout" [ref=e50] [cursor=pointer]:
              - /url: /checkout
      - generic [ref=e51]:
        - heading "Legal" [level=4] [ref=e52]
        - list [ref=e53]:
          - listitem [ref=e54]:
            - link "Privacy Policy" [ref=e55] [cursor=pointer]:
              - /url: /privacy
          - listitem [ref=e56]:
            - link "Terms of Service" [ref=e57] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e58]:
            - link "Cookie Policy" [ref=e59] [cursor=pointer]:
              - /url: /cookies
      - generic [ref=e60]:
        - heading "Contact" [level=4] [ref=e61]
        - list [ref=e62]:
          - listitem [ref=e63]:
            - link "Contact Us" [ref=e64] [cursor=pointer]:
              - /url: /contact
    - generic [ref=e65]: © 2026 teeest cats ecommerce. All rights reserved.
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | 
  3   | test.describe('Botones de UserAccountPage', () => {
  4   |   test('botón Sign In existe y es clickeable', async ({ page }) => {
  5   |     await page.goto('/account');
  6   |     const signInBtn = page.getByRole('button', { name: /sign in/i });
  7   |     await expect(signInBtn).toBeVisible();
  8   |     await expect(signInBtn).toBeEnabled();
  9   |   });
  10  | 
  11  |   test('botón Sign In llama al handler de login', async ({ page }) => {
  12  |     await page.goto('/account');
  13  |     const signInBtn = page.getByRole('button', { name: /sign in/i });
  14  |     await signInBtn.click();
  15  |   });
  16  | 
  17  |   test('botón Sign Up alterna a vista de registro', async ({ page }) => {
  18  |     await page.goto('/account');
  19  |     const signUpLink = page.getByRole('button', { name: /sign up/i });
  20  |     await expect(signUpLink).toBeVisible();
  21  |     await signUpLink.click();
  22  |     const createAccountHeading = page.getByRole('heading', { name: /create account/i });
  23  |     await expect(createAccountHeading).toBeVisible();
  24  |   });
  25  | 
  26  |   test('botón Sign Out existe para usuario autenticado', async ({ page }) => {
  27  |     await page.goto('/account');
  28  |     await page.getByRole('button', { name: /sign out/i }).isHidden({ timeout: 5000 }).catch(() => {
  29  |       /* usuario no autenticado, test no aplicable */
  30  |     });
  31  |   });
  32  | });
  33  | 
  34  | test.describe('Botones de CartPage', () => {
  35  |   test('botón Continue Shopping existe y es clickeable', async ({ page }) => {
  36  |     await page.goto('/cart');
  37  |     const continueShoppingBtn = page.getByRole('link', { name: /continue shopping/i }).getByRole('button');
  38  |     await expect(continueShoppingBtn).toBeVisible();
  39  |     await expect(continueShoppingBtn).toBeEnabled();
  40  |   });
  41  | 
  42  |   test('botón Remove existe y es clickeable', async ({ page }) => {
  43  |     await page.goto('/cart');
  44  |     const removeBtn = page.getByRole('button', { name: /remove/i });
  45  |     await expect(removeBtn.first()).toBeVisible();
  46  |   });
  47  | 
  48  |   test('botón Proceed to Checkout existe y es clickeable', async ({ page }) => {
  49  |     await page.goto('/cart');
  50  |     const checkoutBtn = page.getByRole('link', { name: /proceed to checkout/i }).getByRole('button');
> 51  |     await expect(checkoutBtn).toBeVisible();
      |                               ^ Error: expect(locator).toBeVisible() failed
  52  |   });
  53  | });
  54  | 
  55  | test.describe('Botones de CheckoutPage', () => {
  56  |   test('botón Continue Shopping existe y es clickeable', async ({ page }) => {
  57  |     await page.goto('/checkout');
  58  |     const continueShoppingBtn = page.getByRole('button', { name: /continue shopping/i });
  59  |     await expect(continueShoppingBtn).toBeVisible();
  60  |     await expect(continueShoppingBtn).toBeEnabled();
  61  |   });
  62  | 
  63  |   test('botón Place Order existe y es clickeable cuando hay dirección', async ({ page }) => {
  64  |     await page.goto('/checkout');
  65  |     const placeOrderBtn = page.getByRole('button', { name: /place order/i });
  66  |     await expect(placeOrderBtn).toBeVisible();
  67  |   });
  68  | 
  69  |   test('botón Place Order está deshabilitado sin dirección de envío', async ({ page }) => {
  70  |     await page.goto('/checkout');
  71  |     const placeOrderBtn = page.getByRole('button', { name: /place order/i });
  72  |     await expect(placeOrderBtn).toBeDisabled();
  73  |   });
  74  | });
  75  | 
  76  | test.describe('Botones de Navbar', () => {
  77  |   test('link Sign In redirige a /account', async ({ page }) => {
  78  |     await page.goto('/');
  79  |     const signInLink = page.getByRole('link', { name: /sign in/i });
  80  |     await signInLink.click();
  81  |     await expect(page).toHaveURL(/.*account/);
  82  |   });
  83  | 
  84  |   test('link Cart redirige a /cart', async ({ page }) => {
  85  |     await page.goto('/');
  86  |     const cartLink = page.getByRole('link', { name: /cart/i }).first();
  87  |     await cartLink.click();
  88  |     await expect(page).toHaveURL(/.*cart/);
  89  |   });
  90  | 
  91  |   test('link Logout no es visible para usuarios no autenticados', async ({ page }) => {
  92  |     await page.goto('/');
  93  |     const logoutBtn = page.getByRole('button', { name: /logout/i });
  94  |     await expect(logoutBtn).toBeHidden();
  95  |   });
  96  | });
  97  | 
  98  | test.describe('Botones de NewsletterForm', () => {
  99  |   test('botón submit del newsletter existe y es clickeable', async ({ page }) => {
  100 |     await page.goto('/');
  101 |     const submitBtn = page.locator('button[type="submit"]');
  102 |     await expect(submitBtn).toBeVisible();
  103 |     await expect(submitBtn).toBeEnabled();
  104 |   });
  105 | });
  106 | 
  107 | test.describe('Botones de Pagination', () => {
  108 |   test('botón previous page existe y es clickeable', async ({ page }) => {
  109 |     await page.goto('/category/electronics');
  110 |     const prevBtn = page.getByRole('button', { name: /previous/i });
  111 |     await expect(prevBtn).toBeVisible();
  112 |   });
  113 | 
  114 |   test('botón next page existe y es clickeable', async ({ page }) => {
  115 |     await page.goto('/category/electronics');
  116 |     const nextBtn = page.getByRole('button', { name: /next/i });
  117 |     await expect(nextBtn).toBeVisible();
  118 |   });
  119 | });
  120 | 
  121 | test.describe('Botones de Modal', () => {
  122 |   test('botón close del modal existe y es clickeable', async ({ page }) => {
  123 |     await page.goto('/');
  124 |     const closeBtn = page.getByRole('button', { name: /close/i });
  125 |     await expect(closeBtn).toBeHidden();
  126 |   });
  127 | });
  128 | 
  129 | test.describe('Botones de QuantitySelector', () => {
  130 |   test('botón decrement existe y es clickeable', async ({ page }) => {
  131 |     await page.goto('/cart');
  132 |     const decrementBtn = page.getByRole('button', { name: /decrease/i });
  133 |     await expect(decrementBtn.first()).toBeVisible();
  134 |   });
  135 | 
  136 |   test('botón increment existe y es clickeable', async ({ page }) => {
  137 |     await page.goto('/cart');
  138 |     const incrementBtn = page.getByRole('button', { name: /increase/i });
  139 |     await expect(incrementBtn.first()).toBeVisible();
  140 |   });
  141 | });
  142 | 
  143 | test.describe('Botones de AdminProductsPage', () => {
  144 |   test('botón Add product existe y es clickeable', async ({ page }) => {
  145 |     await page.goto('/admin/products');
  146 |     const addBtn = page.getByRole('button', { name: /add product/i });
  147 |     await expect(addBtn).toBeVisible();
  148 |   });
  149 | 
  150 |   test('botón Edit existe y es clickeable', async ({ page }) => {
  151 |     await page.goto('/admin/products');
```