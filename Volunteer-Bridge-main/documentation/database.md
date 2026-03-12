# Database Schema - Volunteer Bridge Project

This doc covers our MySQL setup, specifically how we handled authentication and the volunteer modules. 

---

## description
We’re using a relational setup . The `users` table handles the login logic, and it links out to `roles` for permissions and `volunteers` for  profile info.

- **Users:** This is the core. It’s where our authController.js looks during login.
- **Roles:** A simple lookup table so we don't have to hardcode "admin" or "user" strings.
- **Volunteers:** This extends the user account with extra details like skills and phone numbers.

---

## Tables we're using

### 1. users
This is our primary table for account management. 
* `id`: Standard auto-incrementing integer (Primary Key).
* `email`: We use this for logins. It’s set to UNIQUE so we don't get duplicates.
* `password`: Stores the hashed strings (we're using bcrypt for this).
* `role_id`: A foreign key that points to the `roles` table.
* `created_at`: Tracks when the account was first made.

### 2. roles
Used by our middleware to check permissions.
* `id`: The role ID (1 for Admin, 2 for Volunteer, etc).
* `role_name`: The actual name of the role (e.g., 'Admin').

### 3. volunteers
This table holds the extra details that don't belong in the main auth table.
* `id`: Primary key for the profile.
* `user_id`: This links back to `users.id` .
* `phone`: The volunteer's contact info.
* `skills`:  for whatever they're good at (coding, events, etc).
* `status`: An ENUM to track if they are 'Active' or just 'Pending'.

---

## How it works in the code

### Fetching a User with their Role
When we need to check if someone is an admin in our middleware, we run a join:
```sql
SELECT u.email, r.role_name 
FROM users u
JOIN roles r ON u.role_id = r.id 
WHERE u.id = null;