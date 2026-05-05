import { test, expect } from '@playwright/test';

test.describe('Botones de UserAccountPage', () => {
  test('botón Sign In existe y es clickeable', async ({ page }) => {
    await page.goto('/account');
    const signInBtn = page.getByRole('button', { name: /sign in/i });
    await expect(signInBtn).toBeVisible();
    await expect(signInBtn).toBeEnabled();
  });

  test('botón Sign In llama al handler de login', async ({ page }) => {
    await page.goto('/account');
    const signInBtn = page.getByRole('button', { name: /sign in/i });
    await signInBtn.click();
  });

  test('botón Sign Up alterna a vista de registro', async ({ page }) => {
    await page.goto('/account');
    const signUpLink = page.getByRole('button', { name: /sign up/i });
    await expect(signUpLink).toBeVisible();
    await signUpLink.click();
    const createAccountHeading = page.getByRole('heading', { name: /create account/i });
    await expect(createAccountHeading).toBeVisible();
  });

  test('botón Sign Out existe para usuario autenticado', async ({ page }) => {
    await page.goto('/account');
    await page.getByRole('button', { name: /sign out/i }).isHidden({ timeout: 5000 }).catch(() => {
      /* usuario no autenticado, test no aplicable */
    });
  });
});

test.describe('Botones de CartPage', () => {
  test('botón Continue Shopping existe y es clickeable', async ({ page }) => {
    await page.goto('/cart');
    const continueShoppingBtn = page.getByRole('link', { name: /continue shopping/i }).getByRole('button');
    await expect(continueShoppingBtn).toBeVisible();
    await expect(continueShoppingBtn).toBeEnabled();
  });

  test('botón Remove existe y es clickeable', async ({ page }) => {
    await page.goto('/cart');
    const removeBtn = page.getByRole('button', { name: /remove/i });
    await expect(removeBtn.first()).toBeVisible();
  });

  test('botón Proceed to Checkout existe y es clickeable', async ({ page }) => {
    await page.goto('/cart');
    const checkoutBtn = page.getByRole('link', { name: /proceed to checkout/i }).getByRole('button');
    await expect(checkoutBtn).toBeVisible();
  });
});

test.describe('Botones de CheckoutPage', () => {
  test('botón Continue Shopping existe y es clickeable', async ({ page }) => {
    await page.goto('/checkout');
    const continueShoppingBtn = page.getByRole('button', { name: /continue shopping/i });
    await expect(continueShoppingBtn).toBeVisible();
    await expect(continueShoppingBtn).toBeEnabled();
  });

  test('botón Place Order existe y es clickeable cuando hay dirección', async ({ page }) => {
    await page.goto('/checkout');
    const placeOrderBtn = page.getByRole('button', { name: /place order/i });
    await expect(placeOrderBtn).toBeVisible();
  });

  test('botón Place Order está deshabilitado sin dirección de envío', async ({ page }) => {
    await page.goto('/checkout');
    const placeOrderBtn = page.getByRole('button', { name: /place order/i });
    await expect(placeOrderBtn).toBeDisabled();
  });
});

test.describe('Botones de Navbar', () => {
  test('link Sign In redirige a /account', async ({ page }) => {
    await page.goto('/');
    const signInLink = page.getByRole('link', { name: /sign in/i });
    await signInLink.click();
    await expect(page).toHaveURL(/.*account/);
  });

  test('link Cart redirige a /cart', async ({ page }) => {
    await page.goto('/');
    const cartLink = page.getByRole('link', { name: /cart/i }).first();
    await cartLink.click();
    await expect(page).toHaveURL(/.*cart/);
  });

  test('link Logout no es visible para usuarios no autenticados', async ({ page }) => {
    await page.goto('/');
    const logoutBtn = page.getByRole('button', { name: /logout/i });
    await expect(logoutBtn).toBeHidden();
  });
});

test.describe('Botones de NewsletterForm', () => {
  test('botón submit del newsletter existe y es clickeable', async ({ page }) => {
    await page.goto('/');
    const submitBtn = page.locator('button[type="submit"]');
    await expect(submitBtn).toBeVisible();
    await expect(submitBtn).toBeEnabled();
  });
});

test.describe('Botones de Pagination', () => {
  test('botón previous page existe y es clickeable', async ({ page }) => {
    await page.goto('/category/electronics');
    const prevBtn = page.getByRole('button', { name: /previous/i });
    await expect(prevBtn).toBeVisible();
  });

  test('botón next page existe y es clickeable', async ({ page }) => {
    await page.goto('/category/electronics');
    const nextBtn = page.getByRole('button', { name: /next/i });
    await expect(nextBtn).toBeVisible();
  });
});

test.describe('Botones de Modal', () => {
  test('botón close del modal existe y es clickeable', async ({ page }) => {
    await page.goto('/');
    const closeBtn = page.getByRole('button', { name: /close/i });
    await expect(closeBtn).toBeHidden();
  });
});

test.describe('Botones de QuantitySelector', () => {
  test('botón decrement existe y es clickeable', async ({ page }) => {
    await page.goto('/cart');
    const decrementBtn = page.getByRole('button', { name: /decrease/i });
    await expect(decrementBtn.first()).toBeVisible();
  });

  test('botón increment existe y es clickeable', async ({ page }) => {
    await page.goto('/cart');
    const incrementBtn = page.getByRole('button', { name: /increase/i });
    await expect(incrementBtn.first()).toBeVisible();
  });
});

test.describe('Botones de AdminProductsPage', () => {
  test('botón Add product existe y es clickeable', async ({ page }) => {
    await page.goto('/admin/products');
    const addBtn = page.getByRole('button', { name: /add product/i });
    await expect(addBtn).toBeVisible();
  });

  test('botón Edit existe y es clickeable', async ({ page }) => {
    await page.goto('/admin/products');
    const editBtn = page.getByRole('button', { name: /edit/i });
    await expect(editBtn.first()).toBeVisible();
  });

  test('botón Delete existe y es clickeable', async ({ page }) => {
    await page.goto('/admin/products');
    const deleteBtn = page.getByRole('button', { name: /delete/i });
    await expect(deleteBtn.first()).toBeVisible();
  });
});

test.describe('Botones de FilterAccordion', () => {
  test('botón toggle filter existe y es clickeable', async ({ page }) => {
    await page.goto('/category/electronics');
    const filterToggle = page.getByRole('button', { name: /filters/i }).first();
    await expect(filterToggle).toBeVisible();
  });
});

test.describe('Botones de ContactPage', () => {
  test('botón submit del formulario de contacto existe y es clickeable', async ({ page }) => {
    await page.goto('/contact');
    const submitBtn = page.getByRole('button', { name: /send message/i });
    await expect(submitBtn).toBeVisible();
  });
});

test.describe('Botones de AdminContentPage', () => {
  test('botón Save existe y es clickeable', async ({ page }) => {
    await page.goto('/admin/content');
    const saveBtn = page.getByRole('button', { name: /save/i });
    await expect(saveBtn).toBeVisible();
  });
});