import React from "react";

const Terms = () => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 mt-24">
      <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p className="mb-4">
            Welcome to MySetup. By accessing or using our service, you agree to be bound by these Terms of Service (&quot;Terms&quot;). If you disagree with any part of these terms, you do not have
            permission to access the service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">2. Description of Service</h2>
          <p className="mb-4">
            MySetup is a platform that allows users to share their computer setups and workspaces (&quot;setups&quot;) with the community. The service includes the ability to upload photos, share
            product links, and interact with other users&apos; content through upvotes.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">3. Account Registration</h2>
          <p className="mb-4">
            You can register using Google authentication or by creating an account with your email address. You are responsible for maintaining the security of your account and for all activities that
            occur under your account.
          </p>
          <p className="mb-4">You must provide accurate and complete information when creating an account. You may not use false or misleading information.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">4. User Content</h2>
          <p className="mb-4">Users are responsible for the content they post on MySetup. By posting content, you represent that you own or have the necessary rights to share such content.</p>
          <p className="mb-4">Prohibited content includes but is not limited to:</p>
          <ul className="list-disc ml-6 mb-4">
            <p className="mb-2">- Content that is illegal, harmful, threatening, abusive, harassing, defamatory, or racially offensive</p>
            <p className="mb-2">- Content that infringes on intellectual property rights</p>
            <p className="mb-2">- Content that is unrelated to computer setups or workspaces</p>
            <p className="mb-2">- Spam or commercial content not related to setups</p>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">5. Affiliate Links</h2>
          <p className="mb-4">When you share product links on MySetup, these links may be automatically converted into affiliate links. By using our service, you acknowledge and agree that:</p>
          <ul className="list-disc ml-6 mb-4">
            <p className="mb-2">- Product links you share may be converted to affiliate links</p>
            <p className="mb-2">- MySetup may earn commissions from purchases made through these links</p>
            <p className="mb-2">- Users are not entitled to any share of the affiliate revenue</p>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">6. Content Moderation</h2>
          <p className="mb-4">
            MySetup reserves the right to moderate, edit, or remove any content that violates these Terms. Users can report inappropriate content, which will be reviewed by our moderation team.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">7. Account Termination</h2>
          <p className="mb-4">We reserve the right to terminate or suspend access to our service immediately, without prior notice, for any breach of these Terms.</p>
          <p className="mb-4">Users may request account deletion by contacting us. Account deletion requests will be processed in accordance with our Privacy Policy and applicable laws.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">8. Changes to Terms</h2>
          <p className="mb-4">We reserve the right to modify these terms at any time. We will notify users of any material changes by posting the new Terms on this page.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">9. Limitation of Liability</h2>
          <p className="mb-4">
            MySetup is provided &quot;as is&quot; without any warranty. We shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the
            service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">10. Contact</h2>
          <p className="mb-4">If you have any questions about these Terms, please contact us at oliuuum@gmail.com .</p>
        </section>
      </div>
    </div>
  );
};

export default Terms;
