import { getServerAuthSession } from '@repo/auth/server';
import { Description } from '../_components/description';
import { Comments } from '../_components/comments';
import { getChallengeRouteData } from './getChallengeRouteData';
import { buildMeta } from '~/app/metadata';

interface Props {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params: { id } }: Props) {
  const challenge = await getChallengeRouteData(id, null);
  return buildMeta({
    title: challenge.name,
    description: challenge.shortDescription,
  });
}
export default async function Challenges({ params: { id } }: Props) {
  const session = await getServerAuthSession();
  const challenge = await getChallengeRouteData(id, session);

  return (
    <div className="relative h-full">
      <Description challenge={challenge} />
      <Comments rootId={challenge.id} type="CHALLENGE" />
    </div>
  );
}
