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
    <section className="testimonial-area tmp-section-gapTop" style={{ overflow: 'hidden' }}>
      <div className="container">
        <div className="section-head mb--50">
          <div className="section-sub-title center-title tmp-scroll-trigger tmp-fade-in animation-order-1">
            <span className="subtitle">Client Success Stories</span>
          </div>
          <h2 className="title split-collab tmp-scroll-trigger tmp-fade-in animation-order-2 text-center">
            What Our Clients Say <br /> About Starcode
          </h2>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="swiper-testimonials-area-wrapper-card">
              <div className="swiper swiper-testimonials-2">
                <div className="swiper-wrapper">
                  {displayReviews.map((t, index) => (
                    <div key={t.id || index} className="swiper-slide">
                      <div className="testimonial-card tmponhover style-2">
                        <div className="content">
                          <div className="testimonital-icon">
                            <Image src="/assets/images/icons/quote.svg" alt="testimonial-icon" width={40} height={30} style={{ height: 'auto' }} />
                          </div>
                          <h2 className="text-doc">&quot;{t.text}&quot;</h2>
                          <div className="client-info" style={{ marginTop: '20px' }}>
                            <h3 className="card-title" style={{ marginBottom: '5px' }}>{t.name}</h3>
                            <p className="card-para" style={{ color: '#ffc107', fontSize: '18px', margin: '0' }}>
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
                    </div>
                  ))}
                </div>
                <div className="tmp-swiper-pagination" style={{ marginTop: '40px' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
