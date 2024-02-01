import { test, expect } from "@playwright/test";
const URL_LOGIN = "http://localhost:5173/login";
const URL_REGISTER = "http://localhost:5173/register";
test("can user login", async ({ page }) => {
  await page.goto(URL_LOGIN);

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
test("can user register", async ({ page }) => {
  await page.goto(URL_REGISTER);

  // exprect has title
  await expect(page.getByText("Sign Up").first()).toBeVisible();
  await expect(
    page.getByText("Nice to meet you! Enter your details to register.")
  ).toBeVisible();

  await page.getByPlaceholder("Enter your name..").fill("joe");
  await page.getByPlaceholder("Enter your email..").fill("joe@gmail.com");
  await page.getByPlaceholder("Enter your password..").fill("123456");
  await page.getByPlaceholder("conform password..").fill("123456");
  await page.getByRole("button", { name: "Register" }).click();
  await expect(page.getByText("Cookies Auth")).toBeVisible();
  await expect(page.getByText("joe@gmail.com")).toBeVisible();
  await expect(page.getByText("joe").first()).toBeVisible();
});
