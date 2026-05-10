import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import { Project } from '@/types';

async function getFeaturedProjects(): Promise<Project[]> {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('featured', true)
      .order('created_at', { ascending: false })
      .limit(4);

    if (error || !data) return [];
    return data;
  } catch {
    return [];
  }
}

export default async function HomePortfolio() {
  const projects = await getFeaturedProjects();

  return (
    <div className="latest-portfolio-area custom-column-grid">
      <div className="container">
        <div className="section-head mb--60">
          <div className="section-sub-title center-title tmp-scroll-trigger tmp-fade-in animation-order-1">
            <span className="subtitle">Latest Work</span>
          </div>
          <h2 className="title split-collab tmp-scroll-trigger tmp-fade-in animation-order-2">
            Our Recent Projects &amp; Success Stories
          </h2>
          <p className="description section-sm tmp-scroll-trigger tmp-fade-in animation-order-3">
            We work on Websites, Mobile Apps, and Business Automation. Here are some of our best projects.
          </p>
        </div>
        <div className="row">
          {projects.length === 0 ? (
            <p className="text-center col-12 py-5 text-gray-500">No featured projects found. Add projects and set them as featured in the database.</p>
          ) : (
            projects.map((project, index) => {
              const imageSrc = project.imageUrl || '/assets/images/blog/blog-img-1.jpg';
              const title = project.title || 'Untitled Project';
              const category = project.category || 'PROJECT';
              const link = project.link || '#';

              return (
                <div key={project.id || index} className="col-lg-6 col-md-6">
                  <div className={`latest-portfolio-card ${index % 2 !== 0 ? 'mt_md--50' : ''} tmp-hover-link tmp-scroll-trigger tmp-fade-in animation-order-1`}>
                    <div className="portfoli-card-img">
                      <div className="img-box v2">
                        <Link href={link}>
                          <Image className="img-primary hidden-on-mobile" src={imageSrc} alt={title} width={400} height={300} style={{ objectFit: 'cover' }} />
                          <Image className="img-secondary" src={imageSrc} alt={title} width={400} height={300} style={{ objectFit: 'cover' }} />
                        </Link>
                      </div>
                    </div>
                    <div className="portfolio-card-content-wrap">
                      <div className="content-left">
                        <h3 className="portfolio-card-title">
                          <Link className="link" href={link}>{title}</Link>
                        </h3>
                        <p className="portfoli-card-para">{category}</p>
                      </div>
                      <Link href={link} className="tmp-arrow-icon-btn">
                        <div className="btn-inner">
                          <i className="tmp-icon fa-solid fa-arrow-up-right"></i>
                          <i className="tmp-icon-bottom fa-solid fa-arrow-up-right"></i>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
