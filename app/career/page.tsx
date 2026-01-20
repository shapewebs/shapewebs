import { Button } from "@/components/ui/button"
import "@/styles/pages/career/career.css"

interface JobPosition {
  id: number
  title: string
  department: string
  location: string
  type: string
}

export default function CareerPage() {
  const jobPositions: JobPosition[] = [
    {
      id: 1,
      title: "Frontend Developer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
    },
    {
      id: 2,
      title: "UX Designer",
      department: "Design",
      location: "New York, NY",
      type: "Full-time",
    },
    {
      id: 3,
      title: "Product Manager",
      department: "Product",
      location: "San Francisco, CA",
      type: "Full-time",
    },
    {
      id: 4,
      title: "Marketing Specialist",
      department: "Marketing",
      location: "Remote",
      type: "Contract",
    },
  ]

  return (
    <div className="career__container__L7j3s">
      <section className="career__header__P8k4q">
        <h1 className="career__title__Z5m8r">Careers</h1>
        <p className="career__subtitle__B3n7p">Join our team and help us build amazing products</p>
      </section>

      <section className="career__content__K9j6q">
        <div className="career__section__H7p3s">
          <h2 className="career__section-title__Q5k8q">Why Work With Us</h2>
          <div className="career__benefits-grid__L3j7q">
            <div className="career__benefit-card__P5k8p">
              <h3 className="career__benefit-title__Z7j3s">Flexible Work</h3>
              <p className="career__benefit-description__B9k6p">Work from anywhere in the world with flexible hours.</p>
            </div>
            <div className="career__benefit-card__P5k8p">
              <h3 className="career__benefit-title__Z7j3s">Growth Opportunities</h3>
              <p className="career__benefit-description__B9k6p">Continuous learning and career advancement paths.</p>
            </div>
            <div className="career__benefit-card__P5k8p">
              <h3 className="career__benefit-title__Z7j3s">Competitive Compensation</h3>
              <p className="career__benefit-description__B9k6p">Salary, equity, and comprehensive benefits package.</p>
            </div>
            <div className="career__benefit-card__P5k8p">
              <h3 className="career__benefit-title__Z7j3s">Inclusive Culture</h3>
              <p className="career__benefit-description__B9k6p">Diverse and supportive work environment.</p>
            </div>
          </div>
        </div>

        <div className="career__section__H7p3s">
          <h2 className="career__section-title__Q5k8q">Open Positions</h2>
          <div className="career__jobs-list__K3j7q">
            {jobPositions.map((job) => (
              <div key={job.id} className="career__job-card__Z5k8p">
                <div className="career__job-info__P7j3s">
                  <h3 className="career__job-title__B9k6p">{job.title}</h3>
                  <div className="career__job-meta__L3j7q">
                    <span className="career__job-department__Q5k8p">{job.department}</span>
                    <span className="career__job-location__H7j3s">{job.location}</span>
                    <span className="career__job-type__Z9k6p">{job.type}</span>
                  </div>
                </div>
                <div className="career__job-action__K3j7q">
                  <Button kind="secondary" size="small">
                    Apply Now
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
