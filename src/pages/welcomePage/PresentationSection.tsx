export default function PresentationSection() {
  return (
    <div className="flex flex-wrap p-4  max-w-screen-xl rounded-lg bg-[#EFF7FA]">
      <div className="text-start md:w-[50%]">
        <h2>GraphiQL Project</h2>
        <p>
          This is a final project of RS School React 2023 Q4 course and
          generally dedicated to editor of GraphQl requests. Using it, you can
          try and practice different GraphQl requests, get responses from API,
          explorer API schema, set variables and headers.
        </p>
        <p>
          The app has a sticky header. It also supports localization in Russian
          and English. Authentication and authorization are handled using
          Firebase with email options. Client-side validation ensures secure
          input. The footer contains links to the authors GitHub profiles and
          the course reference
        </p>
      </div>
      <img
        className="h-auto md:w-[50%]"
        src="../../../public/GraphQL.jpg"
        alt="graphql playground"
      />
    </div>
  );
}
