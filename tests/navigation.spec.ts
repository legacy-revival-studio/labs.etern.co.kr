import { test, expect } from "@playwright/test";

test.describe("Page Accessibility", () => {
  test("should load homepage", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/ETERN Labs/);
    await expect(page.locator("h1")).toBeVisible();
  });

  test("should load products page", async ({ page }) => {
    await page.goto("/products");
    await expect(page.locator("h1")).toBeVisible();
  });

  test("should load about page", async ({ page }) => {
    await page.goto("/about");
    await expect(page.locator("h1")).toBeVisible();
  });

  test("should load contact page", async ({ page }) => {
    await page.goto("/contact");
    await expect(page.locator("h1")).toBeVisible();
  });
});
