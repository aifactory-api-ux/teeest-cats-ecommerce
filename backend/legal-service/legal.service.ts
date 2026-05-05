import { Injectable } from '@nestjs/common';
import { LegalPage } from '../shared/dtos/legal.dto';

@Injectable()
export class LegalService {
  private pages: Map<string, LegalPage> = new Map();

  constructor() {
    this.seedLegalPages();
  }

  private seedLegalPages() {
    const now = new Date().toISOString();

    const pages: LegalPage[] = [
      {
        slug: 'privacy',
        title: 'Privacy Policy',
        content: `<h1>Privacy Policy</h1>
<p>This Privacy Policy describes how we collect, use, and share your personal information when you use our service.</p>
<h2>Information We Collect</h2>
<p>We collect information you provide directly to us, including your name, email address, and any other information you choose to provide.</p>
<h2>How We Use Your Information</h2>
<p>We use the information we collect to provide, maintain, and improve our services, process transactions, and communicate with you.</p>
<h2>Information Sharing</h2>
<p>We do not sell, trade, or otherwise transfer your personal information to third parties without your consent.</p>`,
        updatedAt: now,
      },
      {
        slug: 'terms',
        title: 'Terms of Service',
        content: `<h1>Terms of Service</h1>
<p>By accessing or using our service, you agree to be bound by these Terms of Service.</p>
<h2>Use of Service</h2>
<p>You agree to use the service only for lawful purposes and in accordance with these Terms.</p>
<h2>Intellectual Property</h2>
<p>The service and its original content, features, and functionality are owned by us and are protected by international copyright laws.</p>`,
        updatedAt: now,
      },
      {
        slug: 'cookies',
        title: 'Cookie Policy',
        content: `<h1>Cookie Policy</h1>
<p>This Cookie Policy explains how we use cookies and similar tracking technologies on our website.</p>
<h2>What Are Cookies</h2>
<p>Cookies are small text files that are placed on your device when you visit a website. They help websites remember your preferences and understand how you interact with the site.</p>
<h2>How We Use Cookies</h2>
<p>We use cookies to understand how you use our website, remember your preferences, and improve your user experience.</p>`,
        updatedAt: now,
      },
    ];

    pages.forEach(page => this.pages.set(page.slug, page));
  }

  async getLegalPage(slug: string): Promise<LegalPage> {
    const page = this.pages.get(slug);
    if (!page) {
      throw new Error('Legal page not found');
    }
    return page;
  }
}