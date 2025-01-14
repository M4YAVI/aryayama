import { fetchGitHubData } from '@/actions/gitAction';
import DirectoryTree from '@/components/DirectoryTree';
import Heatmap from '@/components/githeatmap/git';
import Wrapper from '@/components/home/Wrapper';

export default async function Page3() {
  const githubData = await fetchGitHubData('SangeethChejerla');
  return (
    <Wrapper>
      <div className="max-w-3xl mx-auto">
        <DirectoryTree />
        <Heatmap data={githubData} />
      </div>
    </Wrapper>
  );
}
