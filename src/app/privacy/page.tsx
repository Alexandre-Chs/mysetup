import React from "react";

const Privacy = () => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 mt-24">
      <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
          <p className="mb-4">We collect the following information when you use MySetup:</p>
          <ul className="list-disc ml-6 mb-4">
            <p className="mb-2">- Email address</p>
            <p className="mb-2">- Username</p>
            <p className="mb-2">- Password (encrypted)</p>
            <p className="mb-2">- Information provided by Google authentication (email only)</p>
            <p className="mb-2">- Content you upload (including photos and product links)</p>
            <p className="mb-2">- Interaction data (such as upvotes)</p>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
          <p className="mb-4">We use your information for the following purposes:</p>
          <ul className="list-disc ml-6 mb-4">
            <p className="mb-2">- To provide and maintain our service</p>
            <p className="mb-2">- To authenticate your account</p>
            <p className="mb-2">- To enable you to share and interact with setup content</p>
            <p className="mb-2">- To convert product links into affiliate links</p>
            <p className="mb-2">- To improve our service and user experience</p>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">3. Data Storage and Security</h2>
          <p className="mb-4">Your data is stored securely for as long as you maintain an account with us. We implement appropriate security measures to protect your personal information.</p>
          <p className="mb-4">Your password is encrypted and cannot be accessed in its original form.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">4. Cookies and Authentication</h2>
          <p className="mb-4">We only use essential cookies necessary for authentication purposes. These cookies are required for the proper functioning of our authentication system.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">5. Third-Party Services</h2>
          <p className="mb-4">We use Google authentication as a sign-in option. When you choose to sign in with Google, we only receive your email address.</p>
          <p className="mb-4">Product links shared on our platform may be converted to affiliate links, which allows us to track purchases made through these links.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">6. Your Rights</h2>
          <p className="mb-4">You have the right to:</p>
          <ul className="list-disc ml-6 mb-4">
            <p className="mb-2">- Request access to your personal data</p>
            <p className="mb-2">- Request correction of your personal data</p>
            <p className="mb-2">- Request deletion of your account and associated data</p>
            <p className="mb-2">- Object to processing of your personal data</p>
            <p className="mb-2">- Request data portability</p>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">7. Account Deletion</h2>
          <p className="mb-4">
            You may request account deletion by contacting us. Upon receiving your request, we will process the deletion of your account and personal information in accordance with applicable laws.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">8. Changes to Privacy Policy</h2>
          <p className="mb-4">We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">9. Contact</h2>
          <p className="mb-4">For any questions about this Privacy Policy or to exercise your rights regarding your personal data, please contact us.</p>
        </section>
      </div>
    </div>
  );
};

export default Privacy;
