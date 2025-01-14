'use client';
import { SkillRadar } from '@/components/home/SkillRadar';
import Wrapper from '@/components/home/Wrapper';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { motion } from 'framer-motion';

const systemsData = [
  { subject: 'Python', A: 75, fullMark: 100 },
  { subject: 'TypeScript', A: 70, fullMark: 100 },
  { subject: 'Rust', A: 35, fullMark: 100 },
];

const webDevData = [
  { subject: 'Next.js', A: 72, fullMark: 100 },
  { subject: 'Hono.js', A: 58, fullMark: 100 },
  { subject: 'PostgreSQL', A: 70, fullMark: 100 },
  { subject: 'Drizzle ORM', A: 75, fullMark: 100 },
  { subject: 'TailwindCSS', A: 85, fullMark: 100 },
  { subject: 'Redis', A: 60, fullMark: 100 },
];

const aiMlData = [
  { subject: 'Research Papers', A: 20, fullMark: 100 },
  { subject: 'PyTorch', A: 25, fullMark: 100 },
  { subject: 'ML Concepts', A: 28, fullMark: 100 },
];

const fadeInUpVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

export default function Page3() {
  return (
    <Wrapper>
      <motion.h1
        className="text-5xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent mb-16 text-center tracking-tight"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        My Technical Journey
      </motion.h1>

      <div className="flex flex-col gap-16 max-w-3xl mx-auto">
        <motion.div
          variants={fadeInUpVariants}
          initial="initial"
          animate="animate"
        >
          <Card className="">
            <CardHeader>
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Systems Programming
              </CardTitle>
              <CardDescription className="text-gray-200 mt-6 text-lg leading-relaxed">
                <p className="mb-4">
                  My systems programming journey began with Python, where I
                  developed a strong foundation in building efficient backend
                  services and CLI tools. This led me to TypeScript, which I've
                  used extensively for creating type-safe applications and
                  libraries.
                </p>
                <p>
                  Currently, I'm diving deep into Rust, fascinated by its memory
                  safety guarantees and performance capabilities. I'm working on
                  systems-level projects to strengthen my understanding of
                  low-level programming concepts.
                </p>
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-8">
              <SkillRadar
                data={systemsData}
                colors={['#9b87f5', '#7E69AB', '#6E59A5']}
              />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          variants={fadeInUpVariants}
          initial="initial"
          animate="animate"
        >
          <Card className="">
            <CardHeader>
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Web Development
              </CardTitle>
              <CardDescription className="text-gray-200 mt-6 text-lg leading-relaxed">
                <p className="mb-4">
                  My web development expertise has evolved with modern
                  technologies. Next.js has become my go-to framework for
                  building performant full-stack applications, while Hono.js has
                  proven excellent for creating lightweight APIs.
                </p>
                <p>
                  I've built robust data layers using PostgreSQL with Drizzle
                  ORM, implemented caching strategies with Redis, and crafted
                  beautiful interfaces using TailwindCSS. This stack has enabled
                  me to create scalable, maintainable web applications.
                </p>
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-8">
              <SkillRadar
                data={webDevData}
                colors={[
                  '#1EAEDB',
                  '#0EA5E9',
                  '#F97316',
                  '#3B82F6',
                  '#10B981',
                  '#EC4899',
                ]}
              />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          variants={fadeInUpVariants}
          initial="initial"
          animate="animate"
        >
          <Card className="">
            <CardHeader>
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                AI & Machine Learning
              </CardTitle>
              <CardDescription className="text-gray-200 mt-6 text-lg leading-relaxed">
                <p className="mb-4">
                  My AI/ML journey is just beginning, but I'm passionate about
                  exploring this revolutionary field. I'm currently focusing on
                  understanding fundamental ML concepts and implementing basic
                  models using PyTorch.
                </p>
                <p>
                  I regularly read research papers to stay updated with the
                  latest developments, particularly in natural language
                  processing and computer vision. While I'm still early in this
                  journey, I'm excited about the potential to contribute to this
                  rapidly evolving field.
                </p>
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-8">
              <SkillRadar
                data={aiMlData}
                colors={['#F97316', '#8B5CF6', '#9333EA']}
              />
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </Wrapper>
  );
}
