import { BarChart3, Bot, FileUp, Users, Workflow } from 'lucide-react';
import { Card, CardDescription, CardFooter, CardHeader } from '@/components/ui/card';
import SparklesText from '@/components/ui/sparkles-text';

const Features = () => {
  return (
    <section className="py-16 flex items-center justify-center overflow-hidden">
      <div className="max-w-[75vw]">
        <h2 className="text-3xl font-bold text-center mb-12 text-muted-foreground">Our <span className='text-primary'>Features</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`${feature.color} rounded-lg p-6 hover:shadow-xl transition-shadow duration-300 ease-in-out`}
            >
              <div className="flex items-center mb-4">
                <div className="mr-4 p-3 bg-primary/10 rounded-full text-primary">
                  {feature.icon}
                </div>
                {feature.title}
              </div>
              <p className="text-gray-600 dark:text-gray-300">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const features = [
  {
    title: <h3 className="text-xl font-semibold">Seamless <span className='text-rose-600'>Data Uploading</span></h3>,
    icon: <FileUp size={20} />,
    desc: 'Effortlessly import datasets using our API or CSV file support.',
    color: 'bg-rose-800/10',
  },
  {
    title: <h3 className="text-xl font-semibold">Smart <span className='text-blue-600'>AI Assistant</span></h3>,
    icon: <Bot size={20} />,
    desc: 'Leverage Gemini AI for in-depth data exploration and insights.',
    color: 'bg-blue-800/10',
  },

  {
    title: <h3 className="text-xl font-semibold"><span className='text-orange-600'>Collaborate</span> with Your Team</h3>,
    icon: <Users size={20} />,
    desc: 'Work together in real-time to achieve your data goals.',
    color: 'bg-orange-800/10',
  },
  {
    title: <h3 className="text-xl font-semibold">Dynamic Visual Analytics</h3>,
    icon: <BarChart3 size={20} />,
    desc: 'Transform your data into actionable charts and graphs instantly.',
    color: 'bg-gray-800/10',
  },

  {
    title: <h3 className="text-xl font-semibold">From <span className='text-purple-600'>Prep</span> to <span className='text-purple-600'>Prediction</span></h3>,
    icon: <Workflow size={20} />,
    desc: 'Shape your data, craft your model, and unleash powerful predictions—all on your terms. Integrate your custom-built API wherever you need it, effortlessly.',
    color: 'bg-purple-800/10',
  }

];

export default Features;
