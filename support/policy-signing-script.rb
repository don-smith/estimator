require 'base64'
require 'openssl'
require 'digest/sha1'

policy_document = '{ "expiration": "2013-01-01T00:00:00Z",
  "conditions": [ 
    {"bucket": "we-estimate-videos"}, 
    ["starts-with", "$key", "upload/"],
    {"acl": "public-read"},
    {"success_action_redirect": "http://we.locksmithdon.net/upload-success"},
    ["starts-with", "$Content-Type", "video"],
    ["content-length-range", 0, 4194304]
  ]
}'

aws_secret_key = "y6pgb7yl+W6V2+iwlVnmOQimj8cGF1qcNNLfJcUU"

policy = Base64.encode64(policy_document).gsub("\n","")

signature = Base64.encode64(
    OpenSSL::HMAC.digest(
        OpenSSL::Digest::Digest.new('sha1'), 
        aws_secret_key, policy)
    ).gsub("\n","")

puts policy
puts ''
puts signature