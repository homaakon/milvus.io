import React, { useState } from 'react';
import Layout from '../../components/layout';
import { graphql } from 'gatsby';
import { useI18next } from 'gatsby-plugin-react-i18next';
import DemoCard from '../../components/card/DemoCard';
import * as styles from './index.module.less';
import imageSearch from '../../images/demos/image-search.png';
import chemical from '../../images/demos/chemical-search.svg';
import ossChat from '../../images/demos/ossChat.png';
import Github from '../../images/demos/github.svg';
import Forum from '../../images/demos/forum.svg';
import { CustomizedContentDialogs } from '../../components/dialog/Dialog';
import { CustomizedSnackbars } from '../../components/snackBar';
import Signup from '../../components/signup';
import Seo from '../../components/seo';
import { findLatestVersion } from '../../utils';

const DEMOS = [
  {
    name: 'Image Search',
    desc: 'Images made searchable. Instantaneously return the most similar images from a massive database.',
    // link: 'http://35.166.123.214:8004/#/',
    href: '/milvus-demos/reverse-image-search',
    cover: imageSearch,
    videoSrc: 'https://www.youtube.com/watch?v=hkU9hJnhGsU',
    lowerCaseName: 'image search',
  },
  {
    name: 'OSSChat',
    desc: 'Enhanced ChatGPT with documentation, issues, blog posts, community Q&A as knowledge bases. Built for every community and developer.',
    href: 'https://osschat.io/',
    cover: ossChat,
    // videoSrc: 'https://www.youtube.com/watch?v=UvhL2vVZ-f4',
    lowerCaseName: 'chatbots',
  },
  {
    name: 'Chemical Structure Search',
    desc: 'Blazing fast similarity search, substructure search, or superstructure search for a specified molecule.',
    // href: 'http://molsearch.milvus.io/',
    cover: chemical,
    videoSrc: 'https://www.youtube.com/watch?v=4u_RZeMBTNI',
    lowerCaseName: 'chemical',
  },
];
const TITLE = 'Milvus Demos';
const DESC = 'Milvus vector search demos';

const DemoPage = ({ data }) => {
  const { allVersion } = data;
  const { language, t } = useI18next();

  const [dialogConfig, setDialogConfig] = useState({
    open: false,
    title: '',
    content: () => <></>,
  });

  const [snackbarConfig, setSnackbarConfig] = useState({
    open: false,
    type: 'info',
    message: '',
  });

  const handelOpenDialog = (content, title) => {
    setDialogConfig({
      open: true,
      title,
      content,
    });
  };

  const handleCloseDialog = () => {
    setDialogConfig({
      open: false,
      title: '',
      content: () => <></>,
    });
  };

  const handleOpenSnackbar = ({ message, type }) => {
    setSnackbarConfig({
      open: true,
      type,
      message,
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbarConfig({
      open: false,
      type: 'info',
      message: '',
    });
  };

  const version = findLatestVersion(allVersion.nodes);

  return (
    <main>
      {/* use for seo */}
      <h1 style={{ display: 'none' }}>Milvus Demos</h1>
      <Layout darkMode={true} t={t} version={version}>
        <Seo title={TITLE} lang={language} description={DESC} />
        <section className={styles.banner}>
          <div className={styles.bannerContent}>
            <h2>
              Milvus makes it easy to add similarity search to your
              applications.
            </h2>
            <p>
              Store, index, and manage massive embedding vectors generated by
              deep neural networks and other machine learning (ML) models.
            </p>
          </div>
        </section>
        <section className={`${styles.content} col-4 col-8 col-12`}>
          <ul className={styles.demoList}>
            {DEMOS.map((demo, index) => (
              <li key={demo.name}>
                <DemoCard
                  {...demo}
                  index={index}
                  handelOpenDialog={handelOpenDialog}
                  handleOpenSnackbar={handleOpenSnackbar}
                />
              </li>
            ))}
          </ul>
          <div className={styles.milvusCommunity}>
            <div className={styles.drawWrapper}></div>
            <div className={styles.leftPart}>
              <div className={styles.join}>
                <h2>Join Milvus community</h2>
                <p>
                  We appreciate and encourage you to join the Milvus community
                  and make contributions altogether.
                </p>
              </div>
            </div>

            <div className={styles.rightPart}>
              <div className={styles.socialMedia}>
                <div className={styles.logo}>
                  <img src={Github} alt="" />
                  <span>GitHub</span>
                </div>

                <p>Dive into the source code.</p>
                <a
                  className={styles.rightPart.cBtn}
                  href="https://bit.ly/3Ct2dKo"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Join Now
                </a>
              </div>
              <div className={styles.socialMedia}>
                <div className={styles.logo}>
                  <img src={Forum} alt="" />
                  <span>Forum</span>
                </div>

                <p>Ask questions and share ideas.</p>
                <a
                  className={styles.rightPart.cBtn}
                  href="https://bit.ly/3H7KOuu"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Join Now
                </a>
              </div>
            </div>
          </div>
        </section>
        <Signup callback={handleOpenSnackbar} t={t} />
      </Layout>
      <CustomizedContentDialogs
        open={dialogConfig.open}
        handleClose={handleCloseDialog}
        title={dialogConfig.title}
      >
        {dialogConfig.content()}
      </CustomizedContentDialogs>

      <CustomizedSnackbars
        open={snackbarConfig.open}
        type={snackbarConfig.type}
        message={snackbarConfig.message}
        handleClose={handleCloseSnackbar}
      />
    </main>
  );
};

export default DemoPage;

export const demoQuery = graphql`
  query ($language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          data
          language
          ns
        }
      }
    }
    allVersion(filter: { released: { eq: "yes" } }) {
      nodes {
        version
      }
    }
  }
`;
