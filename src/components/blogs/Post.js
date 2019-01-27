import React from 'react'
import { DataTable } from './AckerasTable'

const AckerasIntro = () => {
  return (
    <div className="post">
      <div className="w-90 pa2 mt4 mv2">
        This code refers to a{' '}
        <a href="https://github.com/accurat/ackeras" target="_blank" rel="noopener noreferrer">
          simple python library
        </a>
        , called ackeras, that I made. It is a simple wrapper around the keras and sklearn
        libraries. It is by no means an industrial auto-ml library, it is just a simple automated
        first step in data cleaning and analysis. The library sole purpose was (and is) to automate
        some stuff I do often and help me get familiar with the libraries I use every day. For
        example consider this data (head):
      </div>
      <DataTable />
      <div className="w-90 pa2 mv2">The basic usage is at follows.</div>
      <div className="w-90 pa2 mv2">
        First we start with the data preprocessing. The parameters to pass the data cleaner are the
        same as the Pipeline, i.e.:
        <br /> features <code className="python">categorical_features::list</code> which columns to
        treat as categorical
        <br /> <code className="python">timecolumn::string</code> which column to treat as time
        index
        <br /> <code className="python">drop_rest::boolean</code> whether to drop the column not
        treated here (suggested and default)
        <br /> <code className="python">extreme_drop::string</code> if the system fails you
        intervene.
      </div>
      <pre className="codesnippet">
        <code className="python ">
          import pandas as pd <br />
          from ackeras import * <br />
          preprocessor = ackeras.data_cleaning.AccuratPreprocess(raw_data) <br />
          <br />
          data = preprocessor.fit_transform(**parameters)
        </code>
      </pre>
      <div className="w-90 pa2 mv2">
        Another feauture is dimensionality reduction. The ackeras.dim_red is a module that I highly
        suggest <b>not</b> to use explicitly. If you pass labels the Umap takes that into account.
        It is as easy as...
      </div>
      <pre className="codesnippet">
        <code>
          reductor = ackeras.dim_red.RedDimensionality(data, cat_f)
          <br />
          reductor.pca_data = reductor.pca_data.dropna(axis = 0)
          <br />
          umap_data = reductor.umap()
        </code>
      </pre>
      <div className="w-90 pa2 mv2">
        <img src={'plots/umap_ackeras.png'} />
      </div>
      <div className="w-90 pa2 mv2">
        What about clustering? N.B. Do not do clustering on reduced data, to avoid data leakage, and
        to sponsor myself you can use{' '}
        <a
          href="https://github.com/NoFishLikeIan/python_ian_utils"
          target="_blank"
          rel="noopener noreferrer"
        >
          my set of tools
        </a>
        . <br />
        In general running the pipeline of the library is better because I checked the steps to
        avoid common problem data leakage. Read more about it{' '}
        <a
          href="https://machinelearningmastery.com/data-leakage-machine-learning/"
          target="_blank"
          rel="noopener noreferrer"
        >
          here
        </a>
        ! Anyhow, it works as follows...
      </div>
      <pre className="codesnippet">
        <code className="python ">
          clusterer = ackeras.clustering.Clustering(data, cat_f)
          <br /> <br />
          &gt;&gt;&gt; -- Flag --: the column Sales does not seem to be normalized <br />
          &gt;&gt;&gt; -- Flag --: the column Quantity does not seem to be normalized <br />
          &gt;&gt;&gt; -- Flag --: the column Profit does not seem to be normalized <br />
          &gt;&gt;&gt; -- Flag --: the column Latitude does not seem to be normalized <br />
          &gt;&gt;&gt; -- Flag --: the column Longitude does not seem to be normalized
          <br /> <br />
          clustered_data = clusterer.fit_predict()
          <br />
          clustered_reductor = ackeras.dim_red.RedDimensionality(clustered_data, cat_f)
          <br />
          umap_clustered = clustered_reductor.umap() <br />
          plot_emb(umap_clustered, labels = clustered_data.labels)
        </code>
      </pre>
      <div className="w-90 pa2 mv2">
        The library allows you to apply clustering on the unprocessed data, the cleaned data or the
        data after dimensionality reduction has been applied. In general this last practice is still
        a bit controversial and a{' '}
        <a
          href="https://courses.cs.washington.edu/courses/cse546/08sp/slides/cdr.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          work in progress
        </a>{' '}
        but I personally, and consequentially this library,{' '}
        <a
          href="https://github.com/lmcinnes/umap/blob/master/doc/clustering.rst"
          target="_blank"
          rel="noopener noreferrer"
        >
          buy into the idea
        </a>{' '}
        that it is of great help and that the two techniques are closely related and mutually
        beneficial. Blog post coming soon.
      </div>
      <div className="w-90 pa2 mv2">
        Now, what if we want to do some regression or classification? Based on the variable you
        point at as dependent, the library assigns the problem at hand either as classification or
        regression!
      </div>
      <pre className="codesnippet">
        <code className="python ">
          regressor_classification = ackeras.regression.Regression(data, &quot;Category&quot;)
          <br />
          &gt;&gt;&gt; The problem was set to: classification
          <br />
          regressor = ackeras.regression.Regression(data, &quot;Quantity&quot;)
          <br />
          &gt;&gt;&gt; The problem was set to: regression
          <br />
          <br />
          opt_regressor, returning = regressor.fit_predict()
          <br />
          &gt;&gt;&gt; Did not find a reliable solution to the problem
          <br />
          opt_regressor, returning = regressor_classification.fit_predict()
          <br />
          &gt;&gt;&gt; Fitting 5 folds for each of 14 candidates, totalling 70 fits. Score on test
          0.6206344441108776
        </code>
      </pre>
      <div className="w-90 pa2 mv2">
        Last but not least we can do with some outlier detection. I am a bit bothered of writing but
        look at this sexy plot.
      </div>
      <div className="w-90 pa2 mv2">
        <img src={'plots/outlier_ackeras.png'} />
      </div>
    </div>
  )
}

export class Post extends React.Component {
  render() {
    return <AckerasIntro />
  }
}
