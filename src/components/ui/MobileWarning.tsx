'use client';

import Link from 'next/link';

export default function MobileWarning() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a0a] p-8">
            <div className="text-center max-w-sm">

                <div className="mb-8">
                    <img
                        src="/images/avatar.jpg"
                        alt="Abhishek"
                        className="w-20 h-20 mx-auto rounded-full object-cover border-2 border-[#F4D03F]/30"
                    />
                </div>

                <h1 className="text-2xl font-serif text-[#FFF8E7] mb-4">
                    hey, welcome to my space!
                </h1>

                <p className="text-[#a0a0a0] mb-8 leading-relaxed text-sm">
                    this immersive 3D space is made for desktop browsers :( <br/>
                    for the full journey, visit on a computer but feel free to
                    see the portfolio below.
                </p>

                <div className="space-y-3">
                    <Link
                        href="/portfolio"
                        className="block w-full py-3 px-4 bg-[#F4D03F] text-[#0a0a0a] 
                       font-medium rounded-lg hover:bg-[#FFB347] transition-colors
                       no-underline"
                    >
                        portfolio 
                    </Link>

                    <a
                        href="https://github.com/theabgarg"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full py-3 px-4 border border-[#333] text-[#c0c0c0]
                       rounded-lg hover:border-[#555] hover:text-white transition-all
                       no-underline"
                    >
                        github
                    </a>
                </div>
            </div>
        </div>
    );
}

