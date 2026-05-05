# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: buttons.spec.ts >> Botones de AdminProductsPage >> botón Delete existe y es clickeable
- Location: tests-functional/buttons.spec.ts:156:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('button', { name: /delete/i }).first()
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByRole('button', { name: /delete/i }).first()

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
    - generic [ref=e20]:
      - generic [ref=e21]:
        - heading "Products" [level=1] [ref=e22]
        - button "Add Product" [ref=e23] [cursor=pointer]
      - table [ref=e25]:
        - rowgroup [ref=e26]:
          - row "Product Category Price Stock Rating Actions" [ref=e27]:
            - columnheader "Product" [ref=e28]
            - columnheader "Category" [ref=e29]
            - columnheader "Price" [ref=e30]
            - columnheader "Stock" [ref=e31]
            - columnheader "Rating" [ref=e32]
            - columnheader "Actions" [ref=e33]
        - rowgroup
  - contentinfo [ref=e34]:
    - generic [ref=e35]:
      - generic [ref=e36]:
        - heading "teeest cats" [level=3] [ref=e37]
        - paragraph [ref=e38]: Your favorite online store for quality products at great prices.
      - generic [ref=e39]:
        - heading "Shop" [level=4] [ref=e40]
        - list [ref=e41]:
          - listitem [ref=e42]:
            - link "Electronics" [ref=e43] [cursor=pointer]:
              - /url: /category/electronics
          - listitem [ref=e44]:
            - link "Clothing" [ref=e45] [cursor=pointer]:
              - /url: /category/clothing
          - listitem [ref=e46]:
            - link "Home & Garden" [ref=e47] [cursor=pointer]:
              - /url: /category/home
          - listitem [ref=e48]:
            - link "Sports" [ref=e49] [cursor=pointer]:
              - /url: /category/sports
      - generic [ref=e50]:
        - heading "Account" [level=4] [ref=e51]
        - list [ref=e52]:
          - listitem [ref=e53]:
            - link "My Account" [ref=e54] [cursor=pointer]:
              - /url: /account
          - listitem [ref=e55]:
            - link "Cart" [ref=e56] [cursor=pointer]:
              - /url: /cart
          - listitem [ref=e57]:
            - link "Checkout" [ref=e58] [cursor=pointer]:
              - /url: /checkout
      - generic [ref=e59]:
        - heading "Legal" [level=4] [ref=e60]
        - list [ref=e61]:
          - listitem [ref=e62]:
            - link "Privacy Policy" [ref=e63] [cursor=pointer]:
              - /url: /privacy
          - listitem [ref=e64]:
            - link "Terms of Service" [ref=e65] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e66]:
            - link "Cookie Policy" [ref=e67] [cursor=pointer]:
              - /url: /cookies
      - generic [ref=e68]:
        - heading "Contact" [level=4] [ref=e69]
        - list [ref=e70]:
          - listitem [ref=e71]:
            - link "Contact Us" [ref=e72] [cursor=pointer]:
              - /url: /contact
    - generic [ref=e73]: © 2026 teeest cats ecommerce. All rights reserved.
```

# Test source

```ts
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
  152 |     const editBtn = page.getByRole('button', { name: /edit/i });
  153 |     await expect(editBtn.first()).toBeVisible();
  154 |   });
  155 | 
  156 |   test('botón Delete existe y es clickeable', async ({ page }) => {
  157 |     await page.goto('/admin/products');
  158 |     const deleteBtn = page.getByRole('button', { name: /delete/i });
> 159 |     await expect(deleteBtn.first()).toBeVisible();
      |                                     ^ Error: expect(locator).toBeVisible() failed
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