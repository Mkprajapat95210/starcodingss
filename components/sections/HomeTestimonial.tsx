import Image from 'next/image';
import { supabase } from '@/lib/supabase';

export const revalidate = 60; // Revalidate every 60 seconds

export default async function HomeTestimonial() {
  // Fetch approved reviews from database, including the project title
  const { data: reviews } = await supabase
    .from('reviews')
    .select('*, projects(title)')
    .eq('status', 'approved')
    .order('created_at', { ascending: false })
    .limit(10);

  const displayReviews = reviews || [];

  return (
    <section className="testimonial-area tmp-section-gapTop">
      <div className="container">
        <div className="section-head mb--50">
          <div className="section-sub-title center-title tmp-scroll-trigger tmp-fade-in animation-order-1">
            <span className="subtitle">Client Success Stories</span>
          </div>
          <h2 className="title split-collab tmp-scroll-trigger tmp-fade-in animation-order-2">
            What Our Clients Say <br /> About Starcode
          </h2>
        </div>
        <div className="row g-5">
          <div className="col-lg-12">
            <div className="swiper-testimonials-area-wrapper-card">
              <div className="swiper swiper-testimonials-2">
                <div className="swiper-wrapper">
                  {displayReviews.map((t, index) => (
                    <div key={t.id || index} className="swiper-slide">
                      <div className={`testimonial-card tmponhover style-2 tmp-scroll-trigger animation-order-${(index % 2) + 1}`}>
                        <div className="content">
                          <div className="testimonital-icon">
                            <Image src="/assets/images/icons/quote.svg" alt="testimonial-icon" width={40} height={30} />
                          </div>
                          <h2 className="text-doc">&quot;{t.text}&quot;</h2>
                          <h3 className="card-title">{t.name}</h3>
                          <p className="card-para" style={{ color: '#ffc107', marginTop: '10px', fontSize: '18px' }}>
                            {'⭐'.repeat(t.rating)}
                          </p>
                          {t.projects?.title && (
                            <p className="card-para" style={{ fontSize: '14px', marginTop: '5px' }}>
                              Reviewed: <strong>{t.projects.title}</strong>
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  {displayReviews.length === 0 && (
                    <div className="col-12 text-center" style={{ color: '#a0a0a0' }}>
                      <p>No reviews yet.</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="tmp-swiper-pagination" style={{ position: 'relative', marginTop: '40px', display: 'flex', justifyContent: 'center', gap: '10px', minHeight: '20px', alignItems: 'center' }}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
