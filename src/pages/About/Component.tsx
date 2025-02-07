import Head from '@components/common/Head';
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component';
import CTA from '@components/common/CTA';
import { experiences, skills } from '@constants/info';
import 'react-vertical-timeline-component/style.min.css';

export const Component = () => {
  return (
    <>
      <Head title="About" />
      <section className="max-container">
        <h1 className="head-text">
          Hello, I'm{' '}
          <span className="blue-gradient_text font-semibold drop-shadow">
            {' '}
            Asad
          </span>{' '}
          👋
        </h1>

        <div className="mt-5 flex flex-col gap-3 text-slate-500">
          <p>
            Software Engineer based in Bangladesh, specializing in technical
            education through hands-on learning and building applications.
          </p>
        </div>

        <div className="flex flex-col py-10">
          <h3 className="subhead-text">My Skills</h3>

          <div className="mt-16 flex flex-wrap gap-12">
            {skills.map((skill) => (
              <div className="block-container h-20 w-20" key={skill.name}>
                <div className="btn-back rounded-xl" />
                <div className="btn-front flex items-center justify-center rounded-xl">
                  <img
                    src={skill.imageUrl}
                    alt={skill.name}
                    className="h-1/2 w-1/2 object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="py-16">
          <h3 className="subhead-text">Work Experience.</h3>
          <div className="mt-5 flex flex-col gap-3 text-slate-500">
            <p>
              I've worked with all sorts of companies, leveling up my skills and
              teaming up with smart people. Here's the rundown:
            </p>
          </div>

          <div className="mt-12 flex">
            <VerticalTimeline animate={true}>
              {experiences.map((experience) => (
                <VerticalTimelineElement
                  key={experience.company_name}
                  date={experience.date}
                  iconStyle={{ background: experience.iconBg }}
                  icon={
                    <div className="flex h-full w-full items-center justify-center">
                      <img
                        src={experience.icon}
                        alt={experience.company_name}
                        className="h-[60%] w-[60%] object-contain"
                      />
                    </div>
                  }
                  contentStyle={{
                    borderBottom: '8px',
                    borderStyle: 'solid',
                    borderBottomColor: experience.iconBg,
                    boxShadow: 'none',
                  }}
                >
                  <div>
                    <h3 className="font-poppins text-xl font-semibold text-black">
                      {experience.title}
                    </h3>
                    <p
                      className="text-black-500 text-base font-medium"
                      style={{ margin: 0 }}
                    >
                      {experience.company_name}
                    </p>
                  </div>

                  <ul className="my-5 ml-5 list-disc space-y-2">
                    {experience.points.map((point, index) => (
                      <li
                        key={`experience-point-${index}`}
                        className="text-black-500/50 pl-1 text-sm font-normal"
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                </VerticalTimelineElement>
              ))}
            </VerticalTimeline>
          </div>
        </div>

        <hr className="border-slate-200" />

        <CTA />
      </section>
    </>
  );
};

Component.displayName = 'AboutPage';
