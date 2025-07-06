export interface PolicyTemplate {
  name: string;
  description: string;
  content: string;
  requiredFields: string[];
  category: 'legal' | 'operational';
  slug?: string;
}

export const policyTemplates: Record<string, PolicyTemplate> = {
  privacy_policy: {
    name: "Privacy Policy",
    description: "Comprehensive privacy policy covering data collection, usage, and protection practices",
    category: 'legal',
    requiredFields: ['store_name', 'store_url', 'contact_email', 'country', 'business_type'],
    content: `Privacy Policy for {{store_name}}

Last Updated: {{current_date}}

1. INTRODUCTION

Welcome to {{store_name}} ("we," "our," or "us"). We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website {{store_url}} or make purchases from our store.

By using our services, you consent to the data practices described in this policy.

2. INFORMATION WE COLLECT

2.1 Personal Information
We may collect personal information that you voluntarily provide to us, including:
• Name and contact information (email address, phone number, mailing address)
• Payment information (credit card details, billing address)
• Account credentials and preferences
• Communication history with our customer service team

2.2 Automatically Collected Information
When you visit our website, we automatically collect certain information, including:
• IP address and device information
• Browser type and version
• Operating system
• Pages visited and time spent on our website
• Referring website addresses
• Cookies and similar tracking technologies

3. HOW WE USE YOUR INFORMATION

We use the collected information for the following purposes:
• Process and fulfill your orders
• Communicate with you about your account and orders
• Provide customer support and respond to inquiries
• Send marketing communications (with your consent)
• Improve our website and services
• Comply with legal obligations
• Prevent fraud and ensure security

4. SHARING YOUR INFORMATION

We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except in the following circumstances:
• Service providers who assist in our operations
• Legal requirements and law enforcement
• Business transfers (in case of merger or acquisition)
• With your explicit consent

5. DATA SECURITY

We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.

6. COOKIES AND TRACKING TECHNOLOGIES

We use cookies and similar technologies to enhance your browsing experience, analyze website traffic, and personalize content. You can control cookie settings through your browser preferences.

7. YOUR RIGHTS

Depending on your location, you may have the following rights regarding your personal information:
• Access and review your data
• Request correction of inaccurate information
• Request deletion of your data
• Object to processing of your data
• Data portability
• Withdraw consent for marketing communications

8. CHILDREN'S PRIVACY

Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.

9. INTERNATIONAL DATA TRANSFERS

Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your data.

10. CHANGES TO THIS POLICY

We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on our website and updating the "Last Updated" date.

11. CONTACT US

If you have any questions about this Privacy Policy or our data practices, please contact us:

Email: {{contact_email}}
Address: {{store_address}}
Country: {{country}}

For residents of the European Union, you may also contact our Data Protection Officer at {{contact_email}}.

This Privacy Policy is effective as of {{current_date}} and applies to all users of {{store_name}}.`
  },

  terms_conditions: {
    name: "Terms & Conditions",
    description: "Legal terms governing the use of your store and services",
    category: 'legal',
    requiredFields: ['store_name', 'store_url', 'contact_email', 'country', 'business_type'],
    content: `Terms and Conditions for {{store_name}}

Last Updated: {{current_date}}

1. AGREEMENT TO TERMS

By accessing and using {{store_url}} ("the Website"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.

2. INTELLECTUAL PROPERTY RIGHTS

Unless otherwise indicated, the Website is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Website and the trademarks, service marks, and logos contained therein are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws and various other intellectual property rights.

3. USER REPRESENTATIONS

By using the Website, you represent and warrant that:
• You have the legal capacity to agree to these Terms and Conditions
• You are not a minor in the jurisdiction in which you reside
• You will not access the Website through automated or non-human means
• You will not use the Website for any illegal or unauthorized purpose
• Your use of the Website will not violate any applicable law or regulation

4. PRODUCTS AND SERVICES

4.1 Product Descriptions
We strive to display accurate product descriptions and images. However, we do not warrant that product descriptions or other content is accurate, complete, reliable, current, or error-free.

4.2 Pricing
All prices are subject to change without notice. We reserve the right to modify or discontinue any product at any time.

4.3 Availability
Product availability is not guaranteed. We reserve the right to limit quantities and refuse service to anyone.

5. PURCHASES AND PAYMENT

5.1 Order Acceptance
All orders are subject to acceptance and availability. We reserve the right to refuse any order for any reason.

5.2 Payment Terms
Payment must be made at the time of ordering. We accept various payment methods as indicated on our checkout page.

5.3 Taxes
All prices are exclusive of applicable taxes. You are responsible for any taxes associated with your purchase.

6. SHIPPING AND DELIVERY

6.1 Shipping Methods
We offer various shipping options as detailed on our website. Delivery times are estimates only.

6.2 Risk of Loss
Title and risk of loss pass to you upon delivery of the products to the carrier.

7. RETURNS AND REFUNDS

Please refer to our Refund Policy for detailed information about returns and refunds.

8. PROHIBITED ACTIVITIES

You may not access or use the Website for any purpose other than that for which we make the Website available. The Website may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.

9. USER GENERATED CONTRIBUTIONS

The Website may invite you to chat, contribute to, or participate in blogs, message boards, online forums, and other functionality. Any contributions you transmit to the Website will be treated as non-confidential and non-proprietary.

10. PRIVACY POLICY

We care about data privacy and security. Please review our Privacy Policy, which also governs your use of the Website.

11. TERM AND TERMINATION

These Terms and Conditions shall remain in full force and effect while you use the Website. We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever.

12. MODIFICATIONS AND INTERRUPTIONS

We reserve the right to change, modify, or remove the contents of the Website at any time or for any reason at our sole discretion without notice.

13. GOVERNING LAW

These Terms and Conditions and your use of the Website are governed by and construed in accordance with the laws applicable to agreements made and to be entirely performed within {{country}}.

14. DISPUTE RESOLUTION

Any legal action of whatever nature brought by either you or us shall be commenced or prosecuted in the courts of {{country}}, and you hereby consent to, and waive all defenses of lack of personal jurisdiction and forum non conveniens.

15. CORRECTIONS

There may be information on the Website that contains typographical errors, inaccuracies, or omissions. We reserve the right to correct any errors, inaccuracies, or omissions and to change or update the information on the Website at any time, without prior notice.

16. DISCLAIMERS

THE WEBSITE IS PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS. YOU AGREE THAT YOUR USE OF THE WEBSITE SERVICES WILL BE AT YOUR SOLE RISK.

17. LIMITATIONS OF LIABILITY

IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY DIRECT, INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES.

18. INDEMNIFICATION

You agree to defend, indemnify, and hold us harmless, including our subsidiaries, affiliates, and all of our respective officers, agents, partners, and employees, from and against any loss, damage, liability, claim, or demand, including reasonable attorneys' fees and expenses.

19. USER DATA

We will maintain certain data that you transmit to the Website for the purpose of managing the performance of the Website, as well as data relating to your use of the Website.

20. ELECTRONIC COMMUNICATIONS

Visiting the Website, sending us emails, and completing online forms constitute electronic communications. You consent to receive electronic communications, and you agree that all agreements, notices, disclosures, and other communications we provide to you electronically satisfy any legal requirement that such communications be in writing.

21. CONTACT INFORMATION

In order to resolve a complaint regarding the Website or to receive further information regarding use of the Website, please contact us at:

Email: {{contact_email}}
Address: {{store_address}}
Country: {{country}}

These Terms and Conditions were last updated on {{current_date}}.`
  },

  cookie_policy: {
    name: "Cookie Policy",
    description: "Detailed policy explaining how cookies and tracking technologies are used",
    category: 'legal',
    requiredFields: ['store_name', 'store_url', 'contact_email', 'country'],
    content: `Cookie Policy for {{store_name}}

Last Updated: {{current_date}}

1. INTRODUCTION

This Cookie Policy explains how {{store_name}} ("we," "us," or "our") uses cookies and similar technologies when you visit our website {{store_url}}. This policy should be read alongside our Privacy Policy, which explains how we use your personal information.

2. WHAT ARE COOKIES?

Cookies are small text files that are stored on your device (computer, tablet, or mobile) when you visit a website. They help websites remember information about your visit, such as your preferred language and other settings, which can make your next visit easier and the site more useful to you.

3. TYPES OF COOKIES WE USE

3.1 Essential Cookies
These cookies are necessary for the website to function and cannot be switched off in our systems. They are usually only set in response to actions made by you which amount to a request for services, such as setting your privacy preferences, logging in, or filling in forms.

Examples of essential cookies:
• Shopping cart functionality
• User authentication
• Security features
• Basic website functionality

3.2 Performance Cookies
These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us to know which pages are the most and least popular and see how visitors move around the site.

Examples of performance cookies:
• Google Analytics
• Website usage statistics
• Page load times
• Error tracking

3.3 Functional Cookies
These cookies enable the website to provide enhanced functionality and personalization. They may be set by us or by third-party providers whose services we have added to our pages.

Examples of functional cookies:
• Language preferences
• User interface customization
• Social media integration
• Customer support chat

3.4 Marketing Cookies
These cookies may be set through our site by our advertising partners. They may be used by those companies to build a profile of your interests and show you relevant advertisements on other sites.

Examples of marketing cookies:
• Social media advertising
• Retargeting campaigns
• Affiliate marketing
• Email marketing tracking

4. THIRD-PARTY COOKIES

We may use third-party services that set their own cookies. These services include:

4.1 Analytics Services
• Google Analytics: Helps us understand how visitors interact with our website
• Facebook Pixel: Tracks conversions and optimizes advertising campaigns

4.2 Payment Processors
• Stripe: Processes payment transactions
• PayPal: Handles alternative payment methods

4.3 Social Media
• Facebook, Instagram, Twitter: Social media integration and sharing

5. COOKIE DURATION

5.1 Session Cookies
These cookies are temporary and are deleted when you close your browser. They are used to maintain your session while you browse our website.

5.2 Persistent Cookies
These cookies remain on your device for a set period or until you delete them. They are used to remember your preferences and settings.

6. MANAGING COOKIES

6.1 Browser Settings
You can control and/or delete cookies as you wish. You can delete all cookies that are already on your computer and you can set most browsers to prevent them from being placed.

To manage cookies in your browser:
• Chrome: Settings > Privacy and security > Cookies and other site data
• Firefox: Options > Privacy & Security > Cookies and Site Data
• Safari: Preferences > Privacy > Manage Website Data
• Edge: Settings > Cookies and site permissions > Cookies and site data

6.2 Opt-Out Options
You can opt out of certain types of cookies:
• Google Analytics: Use the Google Analytics Opt-out Browser Add-on
• Facebook: Adjust your Facebook ad preferences
• Email marketing: Use the unsubscribe link in our emails

7. COOKIE CONSENT

When you first visit our website, you will see a cookie consent banner. You can:
• Accept all cookies
• Reject non-essential cookies
• Customize your cookie preferences

Your consent choices will be remembered for future visits.

8. UPDATES TO THIS POLICY

We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the new policy on our website.

9. CONTACT US

If you have any questions about our use of cookies, please contact us:

Email: {{contact_email}}
Address: {{store_address}}
Country: {{country}}

10. COOKIE LIST

Below is a detailed list of cookies we use:

Essential Cookies:
• session_id: Maintains your session while browsing
• cart_token: Remembers your shopping cart contents
• csrf_token: Protects against cross-site request forgery

Performance Cookies:
• _ga: Google Analytics tracking
• _gid: Google Analytics session tracking
• _gat: Google Analytics throttling

Functional Cookies:
• language: Remembers your language preference
• currency: Remembers your currency preference
• user_preferences: Stores your UI preferences

Marketing Cookies:
• _fbp: Facebook Pixel tracking
• _fbc: Facebook conversion tracking
• ads_prefs: Advertising preferences

This Cookie Policy is effective as of {{current_date}} and applies to all users of {{store_name}}.`
  },

  refund_policy: {
    name: "Refund Policy",
    description: "Clear policy outlining refund and return procedures for customers",
    category: 'operational',
    requiredFields: ['store_name', 'store_url', 'contact_email', 'country', 'business_type'],
    content: `Refund Policy for {{store_name}}

Last Updated: {{current_date}}

1. OVERVIEW

At {{store_name}}, we strive to ensure your complete satisfaction with every purchase. This Refund Policy outlines the terms and conditions for returns, exchanges, and refunds for products purchased from our store.

2. RETURN ELIGIBILITY

2.1 General Return Policy
Most items can be returned within 30 days of delivery for a full refund or exchange, provided they meet the following conditions:
• Item is in original condition (unused, unopened, undamaged)
• Original packaging is intact
• Proof of purchase is provided
• Item is not excluded from returns (see section 2.2)

2.2 Non-Returnable Items
The following items are not eligible for return:
• Digital products and downloadable content
• Personalized or custom-made items
• Perishable goods
• Items marked as "Final Sale" or "No Returns"
• Items that have been used, damaged, or altered
• Items missing original packaging or tags

3. RETURN PROCESS

3.1 Initiating a Return
To initiate a return, please:
1. Contact our customer service team at {{contact_email}}
2. Provide your order number and reason for return
3. Include photos of the item if it's damaged
4. Wait for return authorization

3.2 Return Authorization
Once your return is approved, you will receive:
• Return authorization number
• Return shipping label (if applicable)
• Return instructions

3.3 Shipping Returns
• You are responsible for return shipping costs unless the item is defective or we made an error
• Use the provided return shipping label when applicable
• Package items securely to prevent damage during transit
• Include the return authorization number with your package

4. REFUND PROCESS

4.1 Refund Timeline
• Refunds are processed within 5-7 business days of receiving your return
• Credit card refunds may take 7-14 business days to appear on your statement
• PayPal refunds are typically processed within 3-5 business days

4.2 Refund Amount
• Full refund: Original purchase price minus shipping costs (unless item is defective)
• Partial refund: May be issued for items returned in less than original condition
• No refund: For items that don't meet return criteria

4.3 Refund Methods
Refunds will be issued to the original payment method:
• Credit/Debit cards
• PayPal
• Store credit (if requested)

5. EXCHANGES

5.1 Exchange Policy
We offer exchanges for:
• Different sizes or colors of the same item
• Similar items of equal or lesser value
• Defective items for the same item

5.2 Exchange Process
• Contact customer service to request an exchange
• Return the original item following our return process
• Pay any price difference for upgrades
• Receive refund for downgrades

6. DEFECTIVE OR DAMAGED ITEMS

6.1 Reporting Issues
If you receive a defective or damaged item:
• Contact us within 48 hours of delivery
• Provide photos of the damage
• Include your order number
• Do not use or attempt to repair the item

6.2 Resolution Options
For defective or damaged items, we offer:
• Full refund including shipping costs
• Free replacement
• Free return shipping

7. CANCELLATIONS

7.1 Order Cancellation
• Orders can be cancelled within 24 hours of placement
• Cancellations after 24 hours may incur processing fees
• Shipped orders cannot be cancelled

7.2 Cancellation Process
To cancel an order:
• Contact customer service immediately
• Provide your order number
• Confirm cancellation via email

8. INTERNATIONAL RETURNS

8.1 International Shipping
• International customers are responsible for return shipping costs
• Customs duties and taxes are non-refundable
• Return shipping may take 2-4 weeks

8.2 International Refunds
• Refunds exclude original shipping costs
• Currency conversion fees may apply
• Refund timeline may be extended for international transactions

9. STORE CREDIT

9.1 Store Credit Option
• You may choose store credit instead of a refund
• Store credit has no expiration date
• Store credit can be used for future purchases
• Store credit is non-transferable

9.2 Store Credit Process
• Request store credit during return process
• Credit will be issued within 2-3 business days
• Credit code will be sent via email

10. DISPUTES AND APPEALS

10.1 Dispute Resolution
If you disagree with a return decision:
• Contact customer service for review
• Provide additional documentation if needed
• Escalate to management if necessary

10.2 Appeal Process
• Submit appeal within 14 days of return decision
• Include all relevant documentation
• Decision will be made within 5 business days

11. CONTACT INFORMATION

For questions about returns, refunds, or exchanges:

Email: {{contact_email}}
Phone: {{contact_phone}}
Address: {{store_address}}
Country: {{country}}

Customer Service Hours:
Monday - Friday: 9:00 AM - 6:00 PM ({{timezone}})
Saturday: 10:00 AM - 4:00 PM ({{timezone}})
Sunday: Closed

12. POLICY UPDATES

We reserve the right to modify this Refund Policy at any time. Changes will be effective immediately upon posting on our website. Continued use of our services constitutes acceptance of any changes.

This Refund Policy is effective as of {{current_date}} and applies to all purchases from {{store_name}}.`
  },

  shipping_policy: {
    name: "Shipping Policy",
    description: "Comprehensive shipping information including rates, methods, and delivery times",
    category: 'operational',
    requiredFields: ['store_name', 'store_url', 'contact_email', 'country', 'business_type'],
    content: `Shipping Policy for {{store_name}}

Last Updated: {{current_date}}

1. OVERVIEW

This Shipping Policy outlines the shipping methods, costs, and delivery information for orders placed with {{store_name}}. We strive to provide reliable and cost-effective shipping options to meet your needs.

2. SHIPPING METHODS

2.1 Standard Shipping
• Delivery Time: 5-7 business days
• Cost: Varies by location and order value
• Tracking: Included
• Insurance: Basic coverage included

2.2 Express Shipping
• Delivery Time: 2-3 business days
• Cost: Varies by location and order value
• Tracking: Included
• Insurance: Enhanced coverage included

2.3 Overnight Shipping
• Delivery Time: 1 business day
• Cost: Varies by location and order value
• Tracking: Included
• Insurance: Full coverage included
• Available for select locations only

2.4 Free Shipping
• Available on orders over a specified threshold
• Standard shipping method
• Applies to domestic orders only
• Excludes oversized items

3. SHIPPING COSTS

3.1 Domestic Shipping
• Standard: Varies by location and weight
• Express: Varies by location and weight
• Overnight: Varies by location and weight
• Free shipping on orders over specified threshold

3.2 International Shipping
• Standard: Varies by country and weight
• Express: Varies by country and weight
• Delivery time: 7-21 business days
• Customs duties and taxes not included

3.3 Additional Fees
• Oversized items: Additional fees may apply
• Heavy items: Additional fees may apply
• Rural delivery: Additional fees may apply
• Saturday delivery: Additional fees may apply

4. PROCESSING TIME

4.1 Order Processing
• Orders placed before 2:00 PM ({{timezone}}) ship same day
• Orders placed after 2:00 PM ship next business day
• Weekend orders ship Monday
• Holiday orders may be delayed

4.2 Processing Delays
Processing may be delayed due to:
• Payment verification
• Inventory checks
• Custom orders
• Peak season volume
• Weather conditions

5. TRACKING AND NOTIFICATIONS

5.1 Tracking Information
• Tracking numbers provided via email
• Real-time tracking updates
• Delivery confirmation emails
• SMS notifications (optional)

5.2 Tracking Methods
• Email notifications at key milestones
• Online tracking portal
• Mobile app tracking
• Customer service support

6. DELIVERY INFORMATION

6.1 Delivery Areas
• Domestic: All {{country}} states and territories
• International: Select countries (see list below)
• Remote areas may have limited service
• PO Box delivery available

6.2 Delivery Instructions
• Signature required for orders over specified threshold
• Leave with neighbor option available
• Secure location delivery available
• Redelivery attempts: 3 attempts maximum

6.3 Delivery Issues
Common delivery issues and solutions:
• Package not delivered: Contact carrier or customer service
• Damaged package: Document damage and contact us immediately
• Wrong address: Contact customer service within 24 hours
• Missing items: Contact customer service with order details

7. INTERNATIONAL SHIPPING

7.1 Available Countries
We ship to the following countries:
• United States
• Canada
• United Kingdom
• Australia
• Germany
• France
• Japan
• And more (contact us for availability)

7.2 International Considerations
• Customs duties and taxes are the responsibility of the recipient
• Delivery times may vary by country
• Some items may be restricted in certain countries
• International returns may incur additional costs

8. SPECIAL SHIPPING

8.1 Oversized Items
• Special handling required
• Additional shipping costs apply
• Delivery time may be extended
• White glove delivery available

8.2 Fragile Items
• Extra packaging and protection
• Special handling instructions
• Insurance coverage included
• Careful delivery procedures

8.3 Hazardous Materials
• Special permits required
• Additional documentation needed
• Restricted shipping methods
• Limited delivery areas

9. SHIPPING RESTRICTIONS

9.1 Prohibited Items
We cannot ship:
• Alcohol or tobacco products
• Hazardous materials
• Perishable goods (unless specified)
• Live animals
• Illegal substances

9.2 Restricted Items
Some items may have shipping restrictions:
• Electronics (battery restrictions)
• Cosmetics (temperature sensitive)
• Food items (perishable)
• Large furniture (size limitations)

10. WEATHER AND NATURAL DISASTERS

10.1 Weather Delays
• Severe weather may cause delivery delays
• We will notify customers of significant delays
• No additional charges for weather-related delays
• Alternative delivery options may be available

10.2 Natural Disasters
• Service may be suspended in affected areas
• Orders will be held until service resumes
• Refunds available for undeliverable orders
• Communication maintained throughout

11. SHIPPING INSURANCE

11.1 Coverage Levels
• Standard shipping: Basic coverage included
• Express shipping: Enhanced coverage included
• Overnight shipping: Full value coverage
• Additional insurance available

11.2 Claims Process
• Report damage within 48 hours
• Provide photos and documentation
• Claims processed within 5 business days
• Replacement or refund provided

12. CONTACT INFORMATION

For shipping questions or concerns:

Email: {{contact_email}}
Phone: {{contact_phone}}
Address: {{store_address}}
Country: {{country}}

Shipping Department Hours:
Monday - Friday: 8:00 AM - 6:00 PM ({{timezone}})
Saturday: 9:00 AM - 3:00 PM ({{timezone}})
Sunday: Closed

13. POLICY UPDATES

We reserve the right to modify this Shipping Policy at any time. Changes will be effective immediately upon posting on our website. Continued use of our services constitutes acceptance of any changes.

This Shipping Policy is effective as of {{current_date}} and applies to all orders from {{store_name}}.`
  }
};

export const getTemplateBySlug = (slug: string): PolicyTemplate | null => {
  return policyTemplates[slug] || null;
};

export const getAllTemplates = (): PolicyTemplate[] => {
  return Object.entries(policyTemplates).map(([slug, template]) => ({
    ...template,
    slug
  }));
}; 