export const content = `
# Scalability Dimensions

Three forms that measure how a system scales: [Size Scalability](#size-scalability), [Geographical Scalability](#geographical-scalability), and [Administrative Scalability](#administrative-scalability)

---

# Size Scalability
How a system scales when the number of users or resources increase; a size scalable system should remain performant regardless of number of users or resources

---

# Geographical Scalability

How a system scales when new nodes are added. A geographically scalable system should remain performant regardless of the distance between users and the resources

---

# Administrative Scalability

How a system scales in terms of management. Adding more resources as a system grows should not require a large increase in administrative overhead

---
# Vertical Scaling

Increase size of instances

+ Easier to implement and maintain
+ Maintaining data consistency is easier
+ Removes the need for load balancing
+ Costly
- Max resources that can be added
- Increased risk of downtime
- Upgrades would lead to downtime

---

# Horizontal Scaling

Add additional instances

+ Better fault tolerance
+ Provides geograpical benefits: Low latency, regulatory compliance
+ Can scale as much as required
+ Reduced downtime
+ Upgrade without downtime
+ More cost-effective than vertical scaling
- Maintaining data consistency is more challenging
- Requires load balancing
- Servers should either be stateless or require a centralised data store for persisting sessions
- Downstream servers such as caches and databases need to handle more connections as upstream servers scale out

---

# Latency
* Time to perform some action
* **Network Latency**: Time it takes to transfer across a network

---

# Throughput
* Number of actions over a specific time
* **Network throughput**: Volume of data that can pass through a network over a specific time

---

# X.509 Certificate


---

# Session Persistence
Issue cookies and route a specific client's requests to same backend instance

+ Minimises data exchange; servers don't need to exchange session data
+ More effective use of the server's RAM cache

- More difficult to keep load on servers balanced. As such, session persistence should be avoided where possible
---

# SSL Offloading or SSL Termination

* Process of removing SSL encryption from incoming traffic before sending the message unencrypted to the upstream server
* This removes the responsibility of encryption and decryption from upstream servers
---

# NGINX
* Web server that can be used as a reverse proxy, HTTP cache and load balancer

={is}[Load Balancer]
={is}[Reverse Proxy]
={is}[HTTP cache]

---

# Load Balancers
* Load balancers distribute incoming client requests to computing resources
* Only makes sense when there are multiple backend servers
* Provide SSL termination and encryption. Removes the need to perform these operations on backend servers and install X.509 certificates

+ Availability: Redirect traffic if server goes down
+ Scalability: Prevent traffic bottlenecks
+ Security: Monitory and block traffic
+ Flexibility: Can add or remove backend servers
+ Performance: Distribute load evenly, redirect to geographically close servers

- Can become a performance bottleneck
- Increases complexity
- Single load balance becomes a single point of failure
- Multiple load balancers increases complexity

---

# Amazon Elastic Load Balancer

={is}[Load Balancer]

---


# GCP Load Balancer

={is}[Load Balancer]

---

# Round robin

Load balancer rerturns the IP addresses of servers turn by turn

={is}[Load Balancer Algorithms]

---

# Weighted round robin

Assign different weights to each server. Those with higher weights will server more traffic

={is}[Load Balancer Algorithms]

---

# IP Hash

Convert the client IP address to a number which is mapped to a server
={is}[Load Balancer Algorithms]

---

# Layer 4 Load balancing
* Operates at the transport layer using information such as source IP, destination IP and ports
* Efficient and secure: Packet content is neither inspected nor decrypted
* No decisions are made based on content e.g. media type
* Uses simple algorithms such as round robin
* Network packets are forwarded to and from upstream servers. Since the destination IP in the request will be the load balancer itself, NAT is carried out

={is}[Load Balancer Algorithms]

---

# Layer 7 Load balancing
* Operates at the application layer, making decisions based on actual content of the message
* These load balancers perform decryption, inspect the message, make content-based decisions and initiate a new TCP connection to upstream server
* Can identify client sessions to provide session persistence

={is}[Load Balancer Algorithms]

---


# Dynamic load balancing

---

# Internal Load Balancing

---

# External Load Balancing

---

# NAT
Network Address Translation

---

# Clones
Instances added for scalability

- To ensure the user always sees the same response regardless of the server hit, every server should have the same codebase and should not store user-related data like sessions
- If user data is stored with each instance, then the user must hit the same instance for all requests

---

# Session
A session is a message interchange that may be stateful or not

- **Stateful sessions** store the state of the connection between requests server side
- **Stateless sessions** do not store the state between requests server side

---

# Cached Database Queries
The query is hashed and the result stored
- Difficult to delete a cached queries that are complex

---

# Caching
Store data so future requests can be served faster

- Improves performance
- Reduce latency
- Reduce load on servers and databases
- Reduce network cost
- Increase Read Throughput
---

# Memcache
Simple in-memory cache

* Data types: Strings
* Persistence: No native support; cached data is lost if the instance fails
* Data length: Up to 1GB, however larger than 1MB is discouraged due to performance impacts
* Eviction policies: TTL, LRU
* Replication: Native replication is not supported; each node is independent
* Clustering: No native support. Sharding is frequently used at the application level
* Availability: No native failover support
* Multithreading: Multithread architecture that provides parallelism
* Language support: Wide range supported
* Transactions: Not supported
* Operations: Set, get, CAS support

---

# CAS Operation
Compare and swap operations ensure consistency by verifying the current value before writing

---

# HyperLogLog

---

#  LRU
Least recently used eviction policy whereby data that is least accessed is evicted first

---
# Concurrency
Two or more tasks can start, run and complete in overlapping time periods

> Two lines of customers ordering from a single cashier. Likes take turns ordering

---
# Parallelism
Given a single point in time, two or more tasks can run simultaneously

> Two lines of customers ordering from two cashiers


---
# Availability
Proportion of time that a system or service is operational

Overall availability decreases when two components are in sequence
\`\`\`
Availability (Total) = Availability (C1) * Availability (C2)
\`\`\`

Overall availability increases when two components are ran in parallel

\`\`\`
Availability (Total) = 1 - (1 - Availability (C1)) * (1 - Availability (C2))
\`\`\`

---

# Asynchronous
* Non-blocking execution where a task is carried out independently of another task
* Increases scalability by allowing tasks to be executed on another node

---

# Synchronous
* Blocking execution where a task is dependent on another task i.e. a task may need to wait for another to complete

---

# Scalability
* A service is scalable if increasing resources improves performance
* If you have a performance problem, your system is slow for a single user
- If you have a scalability problem, your system is fast for a single user but slow under load

---
# Scalability Patterns
* Microservices: Allow independent scaling
* Load balancing: Enable horizontal scaling by distributing traffic
* Caching: Increase response speed and reduce backend load
* Sharding: Divide and distribute data, and in turn workload, across nodes
* Auto-scaling: Increase/decrease resources based on demand

---

# Availability Patterns
Together, fail over and replication support high availability

---

# Active-Passive Failover

* Only the active server serves traffic.
* If the active server is deemed unhealthy, the passive server takes over and resumes service.
* Heartbeats can be used to determine server health

---

# Active-Active Failover
* All servers handle traffic
* Servers are taken out of action if deemed unhealthy


# Modularity
Modular design allows for individual components to be scaled, updated, or replaced without impacting the entire system, leading to easier maintenance and improved system resilience

---

# Elasticity
Elastic systems can dynamically adjust to workload changes, scaling resources up or down as needed, maximising cost-efficiency and resource utilisation

---

# Loose coupling
Loosely coupled components are minimally dependent on each other. This independence facilitates easier scaling, maintenance and changes

---

# Partitioning
Splits table within one server

---

# Sharding
- Distributes data across multiple servers, which in turn distributes workloads and increases read and write throughput
- Allows larger volumes of data to be stored
-  Queries against a single shard are more efficient
- Partially improves availability; failure of a server will only affect a portion of the data
- Store more data in RAM for faster queries
- Shards may need to be re-partitioned as data grows or changes

## Cons
- Can lead to increased latency if multiple shards need to be queried
---

# Write through
Processor writes to cache first then wait until the data has been updated to storage. Cache and storage are always consistent

---

# Write behind
 
 Data is written to the cache. Instead of waiting, data is written to storage as a background task. Cache and storage can be inconsistent
---

# Stability patterns
Circuit breakers
Timeouts
Fail fast
Bulkheads
Steady state
Throttling

---

# Hadoop

---

# Client-side Consistency Levels
Casual
Read your writes
Session
Monotonic read
Monotonic write

---

# Weak Consistency
After a write, reads may or may not see it. A best effort approach is taken. For example, phone calls, multiplayer games

---

# Eventual Consistency
After a write, reads will eventually see it. Data is replicated asynchronously.

---

# Strong consistency
After a write, reads will see it. Data is replicated synchronously.

---

# DNS
* A Domain Name System translates a domain name to an IP address
* DNS results can be cached by the browser

---

# DNS Lookup
1.  Browser checks local cache
2. Browser makes request to OS which may have its own cache
3. OS reaches out to the DNS resolver which checks its cache
4. DNS resolver makes request to root name server which returns the IPs for the TLD
5. DNS resolver reaches out to TLD server with given IP which returns the authoritative server's IP
6. DNS resolver reaches out to authoritative server with given IP which returns the final IP for the requested address
7. DNS resolver returns IP to OS which in turn returns to the browser

---

# DNS Resolver
* Also known as recursive resolvers
* Responsible for looking up the IP address for a given name
* Resolvers cache responses with a TTL
* Due to the TTL, record updates can take a while to propagate to all resolvers
* To mitigate update issues we can: lower the TTL beforehand or keep the old server running until traffic lowers

---

# DNS Records

* NS record (name server): Specifies the DNS servers for your domain/subdomain
* MX record (mail exchange): Specifies the mail servers for accepting messages
* A record (address): Points a name to an IP address.
* CNAME (canonical): Points a name to another name or \`CNAME\`or to an \`A\` record

---

# DNS Services
Services like Cloudflare and Route 53 provide managed DNS services. They can route traffic using various methods:
* Weighted round robin
* Latency-based
* Geo-based

---

# Name Registration Authority
The Internet Domain Name System is managed by a Name Registration Authority. They are responsible for top-level domains assigned to organisations and countries

---
# Root Name Server
* Store the IP addresses of the TLD name servers
* Each root server has a single IP address. Anycast is used to allow multiple servers per each IP

={is}[Name server]
---

# Top-Level Domain Name Server
* Manages top-level domains like \`com\`, \`org\`
* Stores IP addresses of the authoritative name servers for all the domain names under them

={is}[Name server]

---

# Authoritative Name Server

The name server that holds the final IP address for the requested name

={is}[Name server]

---

# DNS Zone
Distinct part of the domain namespace which is delegated to a legal entity (person, organization or company) who are responsible for maintaining the DNS zone

---

# Anycast

* Allows multiple servers on the network to use the same IP address
* Communication is 1-to-any
* Requests will usually go to the closest CDN
* Helps maintain high availability; if a server goes down, other servers can respond to the request

={is}[Traffic Cast Type]

---
# Unicast
* Communication is 1-to-1
={is}[Traffic Cast Type]
---
# Broadcast
* Communication is 1-to-all
={is}[Traffic Cast Type]
---

# Multicast
* Communication is 1-to-many
={is}[Traffic Cast Type]

---
# Route 53
* Offers routing, failover and health checks
* Focuses on availability and scalability
* Integrates with AWS services

={is}[DNS Resolver]

---

# Cloudflare
* Cloudflare is a global CDN and DNS hosting provider
* Their services improve performance, security and reliability

---

# Cloudflare 1.1.1.1
* Fastest DNS resolver
* Focuses on security and speed

={is}[DNS Resolver]

---

# CDN
* A geographically distributed network of proxy servers, serving content from locations closer to the user
* Reduces network latency
* Increases availability and redundancy
* Reduces bandwidth costs
* Improves security
* Generally serve static files such as HTML, JavaScript and images
* Can also serve dynamic content

={is}[Edge Server]

---

# Push CDN
* Receive new content when changes occur on the origin server
* Suitable when content is not updated often or for sites with a small amount of traffic

={is}[CDN]

---

# Pull CDN

* Pull new content from your server when the first user requests the content
* Redundant requests if TTL expires but content has. It changed
* Stale data if content is updated before TTL expires
* Suitable for sites with heavy traffic since only recently-requested content will remain on the CDN

={is}[CDN]

---

# Edge-Compute Servers
Provides compute resources at the network edge
={is}[Edge Server]

---

# Edge Server
Distributed servers that sit at the network edge close to end users

+ Origin servers process less requests
+ Faster response times

---

# Proxy
- Protect devices on a private network against threats on the internet or external networks
- Can limit type and size of files that pass through and block users who are not authenticated
- Proxy servers sit between the client and backend servers
- Proxies are used to filter, log and modify requests
---

# Forward Proxy
* Forward proxies accepts connections from machines on a private network and forwards requests to the public internet
* They act as a point of exit for subnet users who want to access resources outside their private network
* Machines must be configured with the IP and port of the private network's forward proxy

={is}[Proxy]

---

# Reverse Proxy
* Reverse proxies sit in front of back end servers, forwarding requests to those servers and returning the response to the client
* They act as a point of entry for external systems to access resources on a private subnet
* Provides benefits for even a single backend server 

+ Security: Hide backend server information, blacklist IPs, limit number of connections per client
+ Scalability and flexibility: Clients only see the proxy's IP
+ SSL termination
+ Compression
+ Caching

={is}[Proxy]

---

# Back of Envelope Calculations
- Social network: 500 million users, 200 million DAU
- 10% of users post images
- Server handle 50 requests per second
- ASCII character: 1 byte
- Unicode character: 2 bytes
---
# API Gateway
- API Gateway is an API management tool that sits between a client and backend services
- Provides responsibilities such as authentication, monitoring, load balancing, reverse proxy, caching, throttling, API composition, rate limiting and logging
- 
---
`