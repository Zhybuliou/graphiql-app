export default function ImageComponent() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-6 gap-4 items-center">
      <div className="w-full">
        <img className="w-full" src="/public/react.png" alt="react" />
      </div>
      <div className="w-full">
        <img className="w-full" src="/public/GraphQl.png" alt="GraphQl" />
      </div>
      <div className="w-full">
        <img className="w-full" src="/public/Tailwind_CSS.png" alt="Tailwind" />
      </div>
      <div className="w-full">
        <img className="w-full" src="/public/firebase.png" alt="firebase" />
      </div>
      <div className="w-full">
        <img className="w-full" src="/public/TypeScript.png" alt="TypeScript" />
      </div>
      <div className="w-full">
        <img className="w-full" src="/public/CodeMirror.png" alt="CodeMirror" />
      </div>
    </div>
  );
}
