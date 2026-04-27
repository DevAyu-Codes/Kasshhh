cat << 'EOF' > amplify/auth/post-confirmation/handler.ts
import type { PostConfirmationTriggerHandler } from "aws-lambda";
import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/data";
import { type Schema } from "../../data/resource";

const client = generateClient<Schema>({ authMode: "iam" });

export const handler: PostConfirmationTriggerHandler = async (event) => {
  await client.models.UserProfile.create({
    email: event.request.userAttributes.email,
    profileOwner: `${event.request.userAttributes.sub}::${event.userName}`,
  });
  return event;
};
EOF