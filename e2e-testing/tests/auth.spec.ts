import { test, expect } from "@playwright/test";
const URL = "http://localhost:5173/login";
test("can user login", async ({ page }) => {
  await page.goto(URL);

  // exprect has title
  await expect(page.getByText("Login").first()).toBeVisible();
  await expect(
    page.getByText("Nice to meet you! Enter your details to Login.")
  ).toBeVisible();

  await page.getByPlaceholder("Enter your email..").fill("nam@gmail.com");
  await page.getByPlaceholder("Enter your password..").fill("123456");
  await page.getByRole("button", { name: "Login" }).click();
  await expect(page.getByText("Cookies Auth")).toBeVisible();
  await expect(page.getByText("nam@gmail.com")).toBeVisible();
  await expect(page.getByText("nam").first()).toBeVisible();
});
