import DirectoryTree from '@/components/DirectoryTree';
import Wrapper from '@/components/home/Wrapper';

export default async function Page2() {
  return (
    <Wrapper>
      <div className="max-w-3xl mx-auto">
        <DirectoryTree />
      </div>
    </Wrapper>
  );
}
