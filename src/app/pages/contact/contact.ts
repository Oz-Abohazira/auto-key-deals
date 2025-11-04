import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})
export class ContactPage {
  // FAQ accordion state
  activeFaqIndex: number | null = null;

  faqItems = [
    {
      question: 'How do I know if a key fob is compatible with my car?',
      answer: `View our catalog and check our catalog for your vehicle's make, model, and year. 
               This will help you quickly see what parts are available without needing to reach out for availability`,
    },
    {
      question: 'Do you offer programming services?',
      answer: `We provide detailed step-by-step programming instructions with each key fob purchase. 
              This instructions are only for supported key fobs - You can check it in our catalog or Amazon listing page`
    },
    {
      question: 'How long does shipping typically take?',
      answer: 'All orders are fulfilled and shipped through Amazon. Delivery times follow Amazon’s standard shipping schedules, which usually range from 2 to 5 business days depending on your location and selected shipping method.'
    },
  ];

  toggleFaq(index: number): void {
    this.activeFaqIndex = this.activeFaqIndex === index ? null : index;
  }

  isFaqActive(index: number): boolean {
    return this.activeFaqIndex === index;
  }

  // Email functionality
  copyEmailToClipboard(): void {
    const email = 'autokeydeals1@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
      // You could add a toast notification here
      console.log('Email address copied to clipboard');
      // Temporary visual feedback
      const button = document.querySelector('.copy-email-btn');
      if (button) {
        button.textContent = 'Copied!';
        setTimeout(() => {
          button.innerHTML = `
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
              <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
            </svg>
          `;
        }, 2000);
      }
    }).catch(err => {
      console.error('Failed to copy email address: ', err);
      // Fallback: show email address for manual copy
      alert('Please copy this email address: autokeydeals1@gmail.com');
    });
  }

  // Alternative email methods for better compatibility
  openEmailClient(): void {
    const email = 'autokeydeals1@gmail.com';
    const subject = 'AutoKeyDeals Support Request';
    const body = `Hello AutoKeyDeals Team,

I would like to inquire about:

[Please describe your question or concern here]

My vehicle information (if applicable):
Year: 
Make: 
Model: 

Thank you for your assistance!`;

    const encodedSubject = encodeURIComponent(subject);
    const encodedBody = encodeURIComponent(body);

    // Create multiple fallback mailto URLs
    const mailtoUrls = [
      `mailto:${email}?subject=${encodedSubject}&body=${encodedBody}`,
      `mailto:${email}?subject=${encodedSubject}`,
      `mailto:${email}`
    ];

    // Try each URL in sequence
    let urlIndex = 0;
    const tryNextUrl = () => {
      if (urlIndex < mailtoUrls.length) {
        try {
          window.open(mailtoUrls[urlIndex], '_self');
        } catch (error) {
          console.error(`Failed to open mailto URL ${urlIndex + 1}:`, error);
        }
        urlIndex++;

        // If none worked, provide manual options
        if (urlIndex === mailtoUrls.length) {
          setTimeout(() => {
            this.showEmailFallbackOptions();
          }, 2000);
        }
      }
    };

    tryNextUrl();
  }

  private showEmailFallbackOptions(): void {
    const message = `If your email client didn't open automatically, you can:

1. Copy our email address: autokeydeals1@gmail.com
2. Open your email app manually
3. Compose a new email to our address

Would you like to copy our email address now?`;

    if (confirm(message)) {
      this.copyEmailToClipboard();
    }
  }

  // Gmail specific method (works better on some systems)
  openGmail(): void {
    const email = 'autokeydeals1@gmail.com';
    const subject = 'AutoKeyDeals Support Request';
    const body = `Hello AutoKeyDeals Team,

I would like to inquire about:

[Please describe your question or concern here]

My vehicle information (if applicable):
Year: 
Make: 
Model: 

Thank you for your assistance!`;

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    try {
      window.open(gmailUrl, '_blank');
    } catch (error) {
      console.error('Failed to open Gmail:', error);
      this.openEmailClient(); // Fallback to regular mailto
    }
  }
}
