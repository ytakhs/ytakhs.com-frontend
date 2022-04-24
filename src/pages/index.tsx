import React from 'react';
import type { NextPage } from 'next';
import { Layout } from '../components/layout';
import { Og } from '../components/og';
import Link from 'next/link';
import { ExternalLinkIcon, ChevronRightIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import { H2 } from '../components/heading';

const Home: NextPage = () => {
  return (
    <>
      <Og
        title="ytakhs.com"
        description="ytakhs.com"
        ogType="website"
        entryPath=""
      />
      <Layout>
        <h1 className="hidden">ytakhs.com</h1>
        <div className="flex justify-start">
          <figure className="block px-2 w-full max-w-[30%] h-full max-h-[30%]">
            <Image
              className="static rounded-full"
              layout="responsive"
              width={256}
              height={256}
              src="/images/icon.svg"
              alt="icon"
            />
          </figure>
          <div className="px-4 m-auto w-full">
            <H2 style={{ padding: 0 }}>About</H2>
            <p>@ytakhs</p>
          </div>
        </div>
        <div className="pt-4">
          <H2>Links</H2>
          <ul>
            <li>
              <Link href="/entries">
                <a>
                  <div className="border-b">
                    <span className="inline-flex items-center">
                      Writings <ChevronRightIcon className="mx-2 w-5 h-5" />
                    </span>
                  </div>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/profile">
                <a>
                  <div className="border-b">
                    <span className="inline-flex items-center">
                      Profile <ChevronRightIcon className="mx-2 w-5 h-5" />
                    </span>
                  </div>
                </a>
              </Link>
            </li>
            <li>
              <Link href="https://github.com/ytakhs">
                <a target="_blank">
                  <div className="border-b">
                    <span className="inline-flex items-center">
                      GitHub <ExternalLinkIcon className="mx-2 w-5 h-5" />
                    </span>
                  </div>
                </a>
              </Link>
            </li>
            <li>
              <Link href="https://twitter.com/ytakhs">
                <a target="_blank">
                  <div className="border-b">
                    <span className="inline-flex items-center">
                      Twitter <ExternalLinkIcon className="mx-2 w-5 h-5" />
                    </span>
                  </div>
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </Layout>
    </>
  );
};

export default Home;
