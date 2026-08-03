# OrangeHRM Dashboard Test Plan

## Application Overview

Plan for a new Playwright test that verifies the OrangeHRM dashboard loads for an authenticated admin user and exposes key dashboard widgets and navigation.

## Test Scenarios

### 1. OrangeHRM dashboard

**Seed:** `seed.spec.ts`

#### 1.1. should load the dashboard for an authenticated admin user

**File:** `specs/orangehrm-dashboard.spec.ts`

**Steps:**
  1. Open the OrangeHRM login page in a fresh browser context.
    - expect: The login form is displayed with username, password, and login controls.
  2. Enter the demo credentials Admin and admin123 into the login form.
    - expect: The form fields contain the entered credentials.
  3. Submit the login form.
    - expect: The user is redirected to the dashboard page and the dashboard header is visible.
  4. Verify the dashboard shell is loaded, including the left navigation and top banner.
    - expect: The sidebar shows navigation items such as Admin, PIM, Leave, Dashboard, and the top header displays the Dashboard page title.
  5. Check that the main dashboard widgets are present.
    - expect: The page shows core widgets such as Time at Work, My Actions, Quick Launch, and Buzz Latest Posts.
  6. Verify the authenticated user profile area is visible.
    - expect: The profile area shows the logged-in user name and the profile image.
