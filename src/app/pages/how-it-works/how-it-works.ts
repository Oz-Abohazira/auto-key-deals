import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-how-it-works',
  imports: [CommonModule, RouterLink],
  templateUrl: './how-it-works.html',
  styleUrl: './how-it-works.scss'
})
export class HowItWorksPage implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('stepsContainer', { static: false }) stepsContainer!: ElementRef;
  
  currentStep = 0;
  isScrolling = false;
  
  steps = [
    {
      title: 'Browse Our Catalog',
      subtitle: 'Find Your Key Fob',
      description: 'Explore our collection of car key fobs - Use our advanced filters to find the exact match for your car model and year.',
      features: [
        'Search by car make and model',
        'Filter by year and type',
        'Compare prices and features'
      ],
      bgGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      title: 'Select & Customize',
      subtitle: 'Make it Your Own',
      description: `Choose a Key Fob and Place Order.
                    Share images your current Key Blade with the cuts visible and clear. 
                    We will cut it to make sure it fits perfectly!`,
      features: [
        'Select your Key Fob',
        'Share an Image of the Key Blade',
      ],
      bgGradient: 'linear-gradient(135deg, #834dffff 0%, #800011ff 100%)'
    },
    {
      title: 'Delivery Arriving!',
      subtitle: 'Recieve our Package',
      description: 'The package includes a key that we specifically cut for your car. We handle most of the setup — you just complete the final step',
      features: [
        // 'Amazon Delivery',
        'Multiple payment options',
        // 'Express shipping available',
        'Order tracking included'
      ],
      bgGradient: 'linear-gradient(135deg, #fe4f4fff 0%, #530f0fff 100%)'
    },
    {
      title: 'You Did It!',
      subtitle: 'Time to Enjoy',
      description: 'No more calls, technicians and weird pricing. You pay the price upfront and get a new key!',
      features: [
        'No Surprises',
        'Quick and Easy',
        // 'Technical assistance'
      ],
      bgGradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
    }
  ];

  ngOnInit() {
    // Initial setup
  }

  ngAfterViewInit() {
    this.setupScrollListener();
    this.setupIntersectionObserver();
  }

  ngOnDestroy() {
    // Cleanup listeners
  }

  private setupScrollListener() {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          this.updateCurrentStep();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
  }

  private setupIntersectionObserver() {
    const options = {
      root: null,
      rootMargin: '-20% 0px -20% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, options);

    // Observe all step elements after a short delay
    setTimeout(() => {
      const stepElements = document.querySelectorAll('.step');
      stepElements.forEach(el => observer.observe(el));
    }, 100);
  }

  private updateCurrentStep() {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const newStep = Math.floor(scrollPosition / windowHeight);
    
    if (newStep !== this.currentStep && newStep >= 0 && newStep < this.steps.length) {
      this.currentStep = newStep;
    }
  }

  scrollToStep(stepIndex: number) {
    const targetY = stepIndex * window.innerHeight;
    
    this.isScrolling = true;
    window.scrollTo({
      top: targetY,
      behavior: 'smooth'
    });

    setTimeout(() => {
      this.isScrolling = false;
    }, 1000);
  }

  getStarted() {
    // Navigate to catalog
    window.location.href = '/catalog';
  }
}
