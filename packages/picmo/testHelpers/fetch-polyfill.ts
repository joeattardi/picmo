import fetch, {
  Headers,
  Request,
  Response,
} from 'node-fetch';

if (!window.fetch) {
  window.fetch = fetch as any;
  window.Headers = Headers as any;
  window.Request = Request as any;
  window.Response = Response as any;
}
