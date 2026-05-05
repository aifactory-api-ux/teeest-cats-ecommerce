# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: buttons.spec.ts >> Botones de NewsletterForm >> botón submit del newsletter existe y es clickeable
- Location: tests-functional/buttons.spec.ts:99:7

# Error details

```
Error: expect(locator).toBeEnabled() failed

Locator:  locator('button[type="submit"]')
Expected: enabled
Received: disabled
Timeout:  5000ms

Call log:
  - Expect "toBeEnabled" with timeout 5000ms
  - waiting for locator('button[type="submit"]')
    8 × locator resolved to <button disabled type="submit">Subscribe</button>
      - unexpected value "disabled"

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
    - generic [ref=e19]:
      - generic [ref=e21]:
        - heading "Welcome to teeest cats" [level=1] [ref=e22]
        - paragraph [ref=e23]: Discover amazing products at unbeatable prices. Shop the latest trends in electronics, fashion, and more.
        - link "Shop Now" [ref=e24] [cursor=pointer]:
          - /url: /category/electronics
      - heading "Shop by Category" [level=2] [ref=e27]
      - heading "Featured Products" [level=2] [ref=e30]
      - generic [ref=e33]:
        - heading "Subscribe to Our Newsletter" [level=2] [ref=e34]
        - paragraph [ref=e35]: Get the latest updates on new products and upcoming sales.
        - generic [ref=e37]:
          - textbox "Enter your email" [ref=e38]
          - button "Subscribe" [disabled] [ref=e39]
  - contentinfo [ref=e40]:
    - generic [ref=e41]:
      - generic [ref=e42]:
        - heading "teeest cats" [level=3] [ref=e43]
        - paragraph [ref=e44]: Your favorite online store for quality products at great prices.
      - generic [ref=e45]:
        - heading "Shop" [level=4] [ref=e46]
        - list [ref=e47]:
          - listitem [ref=e48]:
            - link "Electronics" [ref=e49] [cursor=pointer]:
              - /url: /category/electronics
          - listitem [ref=e50]:
            - link "Clothing" [ref=e51] [cursor=pointer]:
              - /url: /category/clothing
          - listitem [ref=e52]:
            - link "Home & Garden" [ref=e53] [cursor=pointer]:
              - /url: /category/home
          - listitem [ref=e54]:
            - link "Sports" [ref=e55] [cursor=pointer]:
              - /url: /category/sports
      - generic [ref=e56]:
        - heading "Account" [level=4] [ref=e57]
        - list [ref=e58]:
          - listitem [ref=e59]:
            - link "My Account" [ref=e60] [cursor=pointer]:
              - /url: /account
          - listitem [ref=e61]:
            - link "Cart" [ref=e62] [cursor=pointer]:
              - /url: /cart
          - listitem [ref=e63]:
            - link "Checkout" [ref=e64] [cursor=pointer]:
              - /url: /checkout
      - generic [ref=e65]:
        - heading "Legal" [level=4] [ref=e66]
        - list [ref=e67]:
          - listitem [ref=e68]:
            - link "Privacy Policy" [ref=e69] [cursor=pointer]:
              - /url: /privacy
          - listitem [ref=e70]:
            - link "Terms of Service" [ref=e71] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e72]:
            - link "Cookie Policy" [ref=e73] [cursor=pointer]:
              - /url: /cookies
      - generic [ref=e74]:
        - heading "Contact" [level=4] [ref=e75]
        - list [ref=e76]:
          - listitem [ref=e77]:
            - link "Contact Us" [ref=e78] [cursor=pointer]:
              - /url: /contact
    - generic [ref=e79]: © 2026 teeest cats ecommerce. All rights reserved.
```

# Test source

```ts
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
  51  |     await expect(checkoutBtn).toBeVisible();
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
> 103 |     await expect(submitBtn).toBeEnabled();
      |                             ^ Error: expect(locator).toBeEnabled() failed
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
  152 |     const editBtn = page.getByRole('button', { name: /edit/i });
  153 |     await expect(editBtn.first()).toBeVisible();
  154 |   });
  155 | 
  156 |   test('botón Delete existe y es clickeable', async ({ page }) => {
  157 |     await page.goto('/admin/products');
  158 |     const deleteBtn = page.getByRole('button', { name: /delete/i });
  159 |     await expect(deleteBtn.first()).toBeVisible();
  160 |   });
  161 | });
  162 | 
  163 | test.describe('Botones de FilterAccordion', () => {
  164 |   test('botón toggle filter existe y es clickeable', async ({ page }) => {
  165 |     await page.goto('/category/electronics');
  166 |     const filterToggle = page.getByRole('button', { name: /filters/i }).first();
  167 |     await expect(filterToggle).toBeVisible();
  168 |   });
  169 | });
  170 | 
  171 | test.describe('Botones de ContactPage', () => {
  172 |   test('botón submit del formulario de contacto existe y es clickeable', async ({ page }) => {
  173 |     await page.goto('/contact');
  174 |     const submitBtn = page.getByRole('button', { name: /send message/i });
  175 |     await expect(submitBtn).toBeVisible();
  176 |   });
  177 | });
  178 | 
  179 | test.describe('Botones de AdminContentPage', () => {
  180 |   test('botón Save existe y es clickeable', async ({ page }) => {
  181 |     await page.goto('/admin/content');
  182 |     const saveBtn = page.getByRole('button', { name: /save/i });
  183 |     await expect(saveBtn).toBeVisible();
  184 |   });
  185 | });
```