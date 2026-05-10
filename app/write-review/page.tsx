import Breadcrumb from '@/components/ui/Breadcrumb';
import ReviewFormSection from '@/components/sections/ReviewFormSection';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Write a Review – Starcode',
  description: 'Share your experience with Starcode. We value your feedback.',
};

export default function WriteReviewPage() {
  return (
    <>
      <Breadcrumb title="Write a Review" current="Review" />
      <div className="contact-area-wrapper tmp-section-gap">
        <ReviewFormSection />
      </div>
    </>
  );
}
