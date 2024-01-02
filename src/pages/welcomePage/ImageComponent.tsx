export default function ImageComponent() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-6 gap-4 items-center">
      <div className="w-full">
        <img className="w-full" src="/react.png" alt="react" />
      </div>
      <div className="w-full">
        <img className="w-full" src="/GraphQl.png" alt="GraphQl" />
      </div>
      <div className="w-full">
        <img className="w-full" src="/Tailwind_CSS.png" alt="Tailwind" />
      </div>
      <div className="w-full">
        <img className="w-full" src="/firebase.png" alt="firebase" />
      </div>
      <div className="w-full">
        <img className="w-full" src="/TypeScript.png" alt="TypeScript" />
      </div>
      <div className="w-full">
        <img className="w-full" src="/CodeMirror.png" alt="CodeMirror" />
      </div>
    </div>
  );
}
