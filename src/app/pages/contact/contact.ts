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
      answer: 'Check our catalog for your vehicle\'s make, model, and year. For additional verification, contact us with your VIN number and we\'ll help you find the perfect match.'
    },
    {
      question: 'Do you offer programming services?',
      answer: 'We provide detailed step-by-step programming instructions with each key fob purchase. For complex cases, we can recommend qualified local automotive locksmiths in your area.'
    },
    {
      question: 'What\'s your return policy?',
      answer: 'We offer a 30-day return policy for unused key fobs in original packaging. Contact us at autokeydeals1@gmail.com for return authorization and detailed instructions.'
    },
    {
      question: 'How long does shipping typically take?',
      answer: 'Standard shipping takes 3-7 business days. We also offer expedited shipping options for urgent orders. All orders are processed within 24 hours on business days.'
    },
    {
      question: 'Do you provide warranty coverage?',
      answer: 'Yes, all our key fobs come with a 1-year warranty against manufacturing defects. This covers functionality issues but not physical damage from misuse.'
    }
  ];

  toggleFaq(index: number): void {
    this.activeFaqIndex = this.activeFaqIndex === index ? null : index;
  }

  isFaqActive(index: number): boolean {
    return this.activeFaqIndex === index;
  }
}
