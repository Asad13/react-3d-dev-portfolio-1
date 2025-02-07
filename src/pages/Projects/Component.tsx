import Head from '@components/common/Head';
import { Link } from 'react-router';
import CTA from '@components/common/CTA';
import { projects } from '@constants/info';
import { arrow } from '@assets/icons';

export const Component = () => {
  return (
    <>
      <Head title="Projects" />
      <section className="max-container">
        <h1 className="head-text">
          My{' '}
          <span className="blue-gradient_text font-semibold drop-shadow">
            Projects
          </span>
        </h1>

        <p className="mt-2 leading-relaxed text-slate-500">
          I've embarked on numerous projects throughout the years, but these are
          the ones I hold closest to my heart. Many of them are open-source, so
          if you come across something that piques your interest, feel free to
          explore the codebase and contribute your ideas for further
          enhancements. Your collaboration is highly valued!
        </p>

        <div className="my-20 flex flex-wrap gap-16">
          {projects.map((project) => (
            <div className="w-full lg:w-[400px]" key={project.name}>
              <div className="block-container h-12 w-12">
                <div className={`btn-back rounded-xl ${project.theme}`} />
                <div className="btn-front flex items-center justify-center rounded-xl">
                  <img
                    src={project.iconUrl}
                    alt="threads"
                    className="h-1/2 w-1/2 object-contain"
                  />
                </div>
              </div>

              <div className="mt-5 flex flex-col">
                <h4 className="font-poppins text-2xl font-semibold">
                  {project.name}
                </h4>
                <p className="mt-2 text-slate-500">{project.description}</p>
                <div className="font-poppins mt-5 flex items-center gap-2">
                  <Link
                    to={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-blue-600"
                  >
                    Link
                  </Link>
                  <img
                    src={arrow}
                    alt="arrow"
                    className="h-4 w-4 object-contain"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <hr className="border-slate-200" />

        <CTA />
      </section>
    </>
  );
};

Component.displayName = 'ProjectsPage';
