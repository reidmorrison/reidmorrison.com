---
layout: default
title: Talks
description: >-
  Conference talks by Reid Morrison at ElixirConf and RailsConf, plus open-source
  contributions.
---

## Talks
{:.no_toc}

**Contents**

* TOC
{:toc}

I speak at ElixirConf and RailsConf.

## ElixirConf

<div class="project-card">
  <h3>Supercharging Kafka Processing with Broadway: Achieving Unmatched Parallelism and Efficiency</h3>
  <p>ElixirConf, 2024. How we harnessed the power of Broadway to supercharge our Kafka message processing, achieving unparalleled parallelism in a high-stakes, mission-critical environment. Discover the challenges we faced, the innovative solutions we implemented, and the transformative benefits we reaped. Learn how Broadway enabled us to scale effortlessly, meeting the ever-growing demands of our dynamic Software as a Service business.</p>
  <p class="project-meta">
    <a href="https://youtu.be/yztdGZALxfE">YouTube</a>
    <a href="/slides/elixirconf-2024-broadway.pdf">Slides</a>
  </p>
</div>

## RailsConf

<div class="project-card">
  <h3>RocketJob: Ruby's Missing Batch System</h3>
  <p>RailsConf, 2016. Lightning talk for Rails developers on RocketJob, the open-source distributed job and batch processing system Reid created and maintains. Covered running background jobs in business-priority order and slicing huge files into pieces that thousands of workers process in parallel, all coordinated through MongoDB with no separate message broker.</p>
  <p class="project-meta">
    <a href="/slides/railsconf-2016-rocketjob.pdf">Slides</a>
  </p>
</div>

<div class="project-card">
  <h3>Pragmatic Concurrency</h3>
  <p>RailsConf, 2015. Lightning talk for Rails developers on why concurrency is hard to get right in Ruby, and Parallel Minion, the open-source gem Reid created and maintains to make it more approachable. Covered running I/O-bound work such as database queries, HTTP calls, and external service requests on separate threads so independent steps overlap, with exceptions re-raised on the calling thread and timeouts to bound the wait.</p>
  <p class="project-meta">
    <a href="/slides/railsconf-2015-pragmatic-concurrency.pdf">Slides</a>
  </p>
</div>

<div class="project-card">
  <h3>Build Powerful Solutions with Ruby Inheritance and NoSQL Databases</h3>
  <p>RailsConf, 2015. Proposed talk, not accepted, on how RocketJob uses Ruby inheritance and Mongoid's single collection inheritance to store background jobs of different types in one NoSQL collection, with typed, validated fields and a clean separation of data from behavior. Would have closed with a call for contributors to RocketJob.</p>
  <p class="project-meta">
    <a href="/slides/railsconf-proposal-2015-ruby-inheritance-nosql.pdf">Slides</a>
  </p>
</div>

<div class="project-card">
  <h3>Logging That Makes Us Happier</h3>
  <p>RailsConf, 2014. Lightning talk for Rails developers on Semantic Logger, the open-source gem Reid created and maintains for high-performance, asynchronous structured logging in Ruby and Rails. Made the case for structured, tagged log entries with levels and metrics, written on a background thread so the application never waits on logging, as a critical part of running mission-critical systems.</p>
  <p class="project-meta">
    <a href="/slides/railsconf-2014-semantic-logger.pdf">Slides</a>
  </p>
</div>

<div class="project-card">
  <h3>Rails Encryption</h3>
  <p>RailsConf, 2012. Lightning talk for Rails developers on encrypting sensitive data at rest, using Symmetric Encryption, the open-source gem Reid created and maintains. Covered encrypting Active Record attributes and passwords in configuration files such as <code>database.yml</code>, with the encryption keys held outside the source code.</p>
  <p class="project-meta">
    <a href="/slides/railsconf-2012-rails-encryption.pdf">Slides</a>
  </p>
</div>

<div class="project-card">
  <h3>Background Jobs with Types</h3>
  <p>RailsConf, 2017. Lightning talk aimed at the Rails core team, making the case for typed arguments and attributes in background jobs.</p>
  <p class="project-meta">
    <a href="/slides/railsconf-2017-background-job-types.pdf">Slides</a>
  </p>
</div>

## Red Hat Road Show

<div class="project-card">
  <h3>Open Source Technology Adoption</h3>
  <p>Red Hat Road Show, 2008. A large audience of Tampa Bay business and technology leaders evaluating open source for their own companies. As Software Architect at WellCare my role was to introduce open source technologies into the company, and this talk walked through several of the projects we delivered successfully with them. It is where my evangelism of open source to business leaders started.</p>
  <p class="project-meta">
    <a href="/slides/redhat-roadshow-2008-open-source.pdf">Slides</a>
  </p>
</div>

## Ruby Meetups

<div class="project-card">
  <h3>Secret Config</h3>
  <p>Ruby Meetup, 2019. Talk for the local Ruby community on Secret Config, the open-source gem Reid created and maintains for centralized configuration and secrets management in Ruby and Rails. Covered loading a tree of settings from AWS SSM Parameter Store or AWS Secrets Manager into memory at startup, overriding any individual setting with an environment variable, and keeping credentials out of source control entirely.</p>
  <p class="project-meta">
    <a href="/slides/ruby-meetup-2019-secret-config.pdf">Slides</a>
  </p>
</div>

<div class="project-card">
  <h3>Logging Best Practices</h3>
  <p>Ruby Meetup, 2018. Talk for the local Ruby community on structured logging and how Semantic Logger, the open-source gem Reid created and maintains, makes it practical: log levels, measuring block durations, tagging and named tags to trace requests across threads, shipping structured, machine-readable log entries to destinations such as Elasticsearch, and building metrics and dashboards from them.</p>
  <p class="project-meta">
    <a href="/slides/ruby-meetup-2018-logging-best-practices.pdf">Slides</a>
  </p>
</div>

<div class="project-card">
  <h3>Logging that makes DevOps happy</h3>
  <p>Ruby Meetup, 2016. Talk for the local Ruby community on structured logging and how Semantic Logger, the open-source gem Reid created and maintains, makes it practical: log levels, measuring block durations, tagging and named tags to trace requests across threads, shipping structured, machine-readable log entries to destinations such as Elasticsearch, and building metrics and dashboards from them.</p>
  <p class="project-meta">
    <a href="/slides/ruby-meetup-2016-logging.pdf">Slides</a>
  </p>
</div>

<div class="project-card">
  <h3>Symmetric Encryption: Encrypting Sensitive Data in Rails</h3>
  <p>Ruby Meetup, 2012. Talk for the local Ruby community introducing Symmetric Encryption, the open-source gem Reid created and maintains for encrypting sensitive data at rest in Ruby and Rails applications. Covered encrypting Active Record attributes, passwords in configuration files, and keeping encryption keys outside the source code in a separate keystore.</p>
  <p class="project-meta">
    <a href="/slides/ruby-meetup-2012-symmetric-encryption.pdf">Slides</a>
  </p>
</div>

<div class="project-card">
  <h3>MongoDB and Mongoid</h3>
  <p>Ruby Meetup, 2012. Talk for the local Ruby community on MongoDB and Mongoid, introducing how a NoSQL document database fits into a Rails application as an alternative or complement to a relational database.</p>
  <p class="project-meta">
    <a href="/slides/ruby-meetup-2012-mongodb-mongoid.pdf">Slides</a>
  </p>
</div>

## Training

<div class="project-card">
  <h3>RocketJob Training</h3>
  <p>Business Training, 2023. Full-day training for business and technical users on operating RocketJob day to day, primarily from the Mission Control web interface. Covered what a job and a worker are, monitoring and managing running jobs, deployments, directory monitoring with Dirmon, read-only and write jobs, the commonly used built-in jobs, access control, and tips and tricks.</p>
  <p class="project-meta">
    <a href="/slides/training-2023-rocketjob.pdf">Slides</a>
  </p>
</div>

<div class="project-card">
  <h3>Remote Work: Observations and Personal Recommendations</h3>
  <p>Business Training, 2020. Talk for business users on transitioning to the remote work environment forced by the Covid shutdowns, drawing on insights from the engineering team's years of hands-on remote work experience.</p>
  <p class="project-meta">
    <a href="/slides/training-2020-remote-work.pdf">Slides</a>
  </p>
</div>

<div class="project-card">
  <h3>Slack Overview: Using Slack for Remote Work</h3>
  <p>Business Training, 2020. Talk for business users on using Slack to run teams that had newly transitioned to remote work during the Covid shutdowns, drawing on insights from the engineering team's years of hands-on remote work experience.</p>
  <p class="project-meta">
    <a href="/slides/training-2020-slack-overview.pdf">Slides</a>
  </p>
</div>

## Contributions

I diagnosed a Rails 4 ActiveRecord connection pool performance regression under
concurrent load
([rails/rails#14891](https://github.com/rails/rails/issues/14891)) and
proposed a fix
([rails/rails#14926](https://github.com/rails/rails/pull/14926)). The Rails
core team reviewed it and merged a smaller-scope version of the fix, split
into several commits, in
[rails/rails#14938](https://github.com/rails/rails/pull/14938).

## Speaking enquiries

The fastest way to reach me is
[LinkedIn](https://www.linkedin.com/in/reidmorrison).
