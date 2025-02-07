import { Link } from 'react-router';

const CTA = () => {
  return (
    <div className="cta">
      <p className="cta-text">
        Have a project in mind? <br className="hidden sm:block" />
        Let’s build something together!
      </p>
      <Link to="/contact" className="btn">
        Contact
      </Link>
    </div>
  );
};

export default CTA;
