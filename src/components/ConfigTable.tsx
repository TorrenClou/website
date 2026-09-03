import schema from "@/../content/generated/config-schema.json";

/**
 * Renders the configuration reference from the schema the backend generates.
 *
 * This page used to be a hand-written table, and it was one of five hand-written
 * tables that disagreed with each other about which variables existed, which
 * were required, and what the defaults were. The schema is produced by
 * `--dump-config-schema` from the annotated option types and attached to each
 * backend release, so what is rendered here is what the code implements.
 */

interface ConfigEntry {
  envName: string;
  configKey: string;
  description: string;
  default: string;
  type: string;
  secret: boolean;
  required: boolean;
  deprecated?: string;
  since?: string;
}

interface ConfigSchema {
  schemaVersion: number;
  productVersion: string;
  entries: ConfigEntry[];
}

const data = schema as ConfigSchema;

export interface ConfigTableProps {
  /** Show only required values, only optional ones, or everything. */
  filter?: "required" | "optional" | "deprecated" | "all";
  /** Restrict to entries whose config key starts with this, e.g. "Observability". */
  section?: string;
}

function select({ filter = "all", section }: ConfigTableProps): ConfigEntry[] {
  return data.entries.filter((entry) => {
    if (section && !entry.configKey.startsWith(section)) return false;

    // Deprecated values are noise in the required/optional lists — someone
    // reading those is setting up an install, not maintaining an old one.
    const isDeprecated = Boolean(entry.deprecated);

    switch (filter) {
      case "required":
        return entry.required && !isDeprecated;
      case "optional":
        return !entry.required && !isDeprecated;
      case "deprecated":
        return isDeprecated;
      default:
        return true;
    }
  });
}

export function ConfigTable(props: ConfigTableProps) {
  const entries = select(props);

  if (entries.length === 0) {
    return <p>No configuration values match.</p>;
  }

  return (
    <div className="my-6 overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr>
            <th className="text-left">Variable</th>
            <th className="text-left">Default</th>
            <th className="text-left">What it does</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr key={entry.envName}>
              <td className="align-top whitespace-nowrap">
                <code>{entry.envName}</code>
                {entry.secret && (
                  <span
                    title="Never print, log, or paste this into a support thread."
                    className="ml-2 rounded px-1.5 py-0.5 text-[0.65rem] uppercase tracking-wide opacity-70 ring-1 ring-current"
                  >
                    secret
                  </span>
                )}
                {entry.required && (
                  <span
                    title="The application will not start without it."
                    className="ml-2 rounded px-1.5 py-0.5 text-[0.65rem] uppercase tracking-wide opacity-70 ring-1 ring-current"
                  >
                    required
                  </span>
                )}
              </td>
              <td className="align-top">
                {entry.default ? entry.default : <span className="opacity-60">unset</span>}
              </td>
              <td className="align-top">
                {entry.description}
                {entry.deprecated && (
                  <>
                    {" "}
                    <em className="opacity-80">{entry.deprecated}</em>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Small footer noting which build the table describes. */
export function ConfigSchemaVersion() {
  return (
    <p className="text-sm opacity-70">
      Generated from TorrenClou <strong>{data.productVersion}</strong>, describing{" "}
      {data.entries.length} configuration values.
    </p>
  );
}
