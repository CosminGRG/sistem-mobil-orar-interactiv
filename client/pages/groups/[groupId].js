import { useRouter } from "next/router";

function GroupDetailPage() {
  const router = useRouter();

  const groupId = router.query.groupId;

  return <h1>The GroupDetail Page + {groupId}</h1>;
}

export default GroupDetailPage;
