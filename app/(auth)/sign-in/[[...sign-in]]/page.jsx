import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <>
      <section className="overflow-hidden sm:grid sm:grid-cols-2 mb-6">
        <div className="p-8 md:p-12 lg:px-16 lg:py-24">
          <div className="mx-auto max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">

            <SignIn />


          </div>
        </div>

        <img
          alt=""
          src="/real-estate-img.jpg"
          className="h-56 w-full object-cover sm:h-full"
        />
      </section>
      <footer>
        <div className="text-center py-4 text-sm">
          &copy; {new Date().getFullYear()} Rentify. All rights reserved.
        </div>
      </footer>
    </>



  )
}
